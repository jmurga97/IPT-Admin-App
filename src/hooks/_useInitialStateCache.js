//Esta version de useInitialState verifica si hay data en el cache para recuperar los datos desde alli y no hacer consultas a la red, con el objetivo
// de minimizar las operaciones de lectura hacia Firestore. Sin embargo, no verifica si hay diferencia entre la data del cache y la data de la base de datos por lo que siempre
// mostrara lo que haya en el local storage

//TODO: Para una proxima implementacion, comparar la data del cache con la del firestore. Si son diferentes, traer data incompleta de firestore, si no
// mostrar la data del cache

import { useState } from "react";
import { auth } from "../config/fbconfig";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocsFromCache,
  where,
  query,
  orderBy,
} from "firebase/firestore";
import initialState from "../initialState";
import { db } from "../config/fbconfig";
import toasts from "../utils/toasts";
import formatDataFromFirestore from "../utils/formatDataFromFirestore";

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const currentUser = auth.currentUser;
  const userRef = (id) => doc(db, "users", id);
  const ticketRef = (ticketId) => doc(db, "tickets", ticketId);
  const usersCollectionRef = collection(db, "users");
  const micronodesCollectionRef = collection(db, "micronodes");
  const kioskoCollectionRef = collection(db, "kiosko");

  const addInitialData = ({ users, micronodes, kiosko, authedKiosko, ticketCounter }) => {
    setState({
      ...state,
      users,
      micronodes,
      kiosko,
      authedKiosko,
      ticketCounter
    });
  };

  const addUser = (user) => {
    setState({
      ...state,
      users: [...state.users, user],
    });
  };

  const addAllTickets = (tickets) => {
    if (tickets.length === 0) {
      setState({
        ...state,
        tickets: [],
      });
    } else {
      setState({
        ...state,
        tickets,
      });
    }
  };

  const addTicket = (payload, id) => {
    //Nota. No utilizar arrays en el estado a menos que
    //estes seguro que no se modificaran sus datos internos a futuro
    console.log('new ticket',payload)
    const newUsers = state.users.map((user) => {
      if (user.userId === id && !user.tickets) {
        return {
          ...user,
          tickets: [payload],
        };
      } else if (user.userId === id && user.tickets) {
        return {
          ...user,
          tickets: [...user["tickets"], payload],
        };
      } else {
        return user;
      }
    });
    setState({
      ...state,
      users: newUsers,
    });
  };

  const addTicketCounter = () => {
    console.log('BEFORE ADD COUNT', state.ticketCounter)
    setState({
      ...state,
      ticketCounter: state.ticketCounter + 1
    })
  }

  const handleInitialData = async () => {
    const date = new Date()
    const now = date.getDate().toString()
    let counter = 0
    if(localStorage.getItem(now)){
      const retrievedTicketCounter = await JSON.parse(localStorage.getItem(now))
      counter = retrievedTicketCounter.counter
    }

    try {
      const queryUsersSnapshot = await getDocsFromCache(usersCollectionRef);
      const queryMicronodesSnapshot = await getDocsFromCache(
        micronodesCollectionRef
      );
      const queryKioskoSnapshot = await getDocsFromCache(kioskoCollectionRef);

      if (
        !queryUsersSnapshot.empty &&
        !queryMicronodesSnapshot.empty &&
        !queryKioskoSnapshot.empty
      ) {
        // Si hay data en el cache, getDocsFromCache recuperara la data y el atributo .empty sera falso

        const kiosko = formatDataFromFirestore(queryKioskoSnapshot);
        const authedKiosko = kiosko.filter(
          (data) => data.email === currentUser.email
        );
        addInitialData({
          users: formatDataFromFirestore(queryUsersSnapshot),
          micronodes: formatDataFromFirestore(queryMicronodesSnapshot),
          kiosko,
          authedKiosko,
          ticketCounter: counter
        });
      } else {
        // Si no hay data en cache, recupero desde Firestore
        const queryUsersSnapshot = await getDocs(usersCollectionRef);
        const queryMicronodesSnapshot = await getDocs(micronodesCollectionRef);
        const queryKioskoSnapshot = await getDocs(kioskoCollectionRef);

        const kiosko = formatDataFromFirestore(queryKioskoSnapshot);
        const authedKiosko = kiosko.filter(
          (data) => data.email === currentUser.email
        );
        addInitialData({
          users: formatDataFromFirestore(queryUsersSnapshot),
          micronodes: formatDataFromFirestore(queryMicronodesSnapshot),
          kiosko,
          authedKiosko,
          ticketCounter: counter
        });
      }
    } catch (error) {
      console.warn(error.message);
    }
  };

  const handleAddUser = async (user) => {
    try {
      const userDocRef = userRef(user.userId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        return "El usuario a registrar ya existe";
      } else {
        await setDoc(userDocRef, user);
        addUser(user);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  const handleAddTicket = async (payload, id) => {
    try {
      //ADD TICKET TO GENERAL LIST
      const ticket = {
        ...payload,
        userId: id,
      };
      const docTicketSnap = await getDoc(ticketRef(payload.ticketId));
      if (docTicketSnap.exists()) {
        return "Este ticket ya existe";
      } else {
        await setDoc(ticketRef(payload.ticketId), ticket);
      }
      //ADD TICKET TO USER
      await updateDoc(userRef(id), {
            tickets: arrayUnion(ticket),
      });
            addTicket(ticket, id);
           toasts("Ticket agregado");

    } catch (err) {
      console.warn(err.message);
    }
  };

  const handleSearchTickets = async (month, year, nextMonth) => {
    const from = new Date(`${year}-${month}`);
    const until = new Date(`${year}-${nextMonth}`);
    const q = query(
      collection(db, "tickets"),
      where("timestamp", ">", from),
      where("timestamp", "<=", until),
      orderBy('timestamp','desc')
    );
    const queryTicketsSnapshot = await getDocs(q);
    const tickets = formatDataFromFirestore(queryTicketsSnapshot);
    addAllTickets(tickets);
  };

  //Agregar contador de ticket vendido al array soldTickets en kioskos para hacer seguimiento de los cierres diarios
  const handleAddTicketCounter = async (kioskoid,ticketsOfTheDayBefore) => {
    try{
      await updateDoc(doc(db,'kiosko',kioskoid),{
        soldTickets: arrayUnion(ticketsOfTheDayBefore)
      })
    } catch(err){
      console.warn(err.message)
    }
  }

  return {
    handleInitialData,
    handleSearchTickets,
    handleAddUser,
    handleAddTicket,
    handleAddTicketCounter,
    addTicketCounter,
    state,
  };
};

export default useInitialState;
