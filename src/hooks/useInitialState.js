import { useState } from "react";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  getDocsFromCache
} from "firebase/firestore";
import initialState from "../initialState";
import { db } from "../config/fbconfig";
import toasts from "../utils/toasts";

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const userRef = (id) => doc(db, "users", id);

  const addInitialUsers = (users) => {
    //console.log(users)
    setState({
      ...state,
      users,
    });
  };

  const addUser = (user) => {
    setState({
      ...state,
      users: [...state.users, user],
    });
  };
  const addTicket = (payload, id) => {
    //Nota. No utilizar arrays en el estado a menos que
    //estes seguro que no se modificaran sus datos internos a futuro
    console.log('ADD TICKET ACTIONS', payload)
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

  // const handleInitialData = async () => {
  //   try {
  //     if (sessionStorage.getItem("users")) {
  //       console.log('FROM STORAGE')
  //       addInitialUsers(JSON.parse(sessionStorage.getItem("users")) );
  //     } else {
  //       const queryUsersSnapshot = await getDocs(collection(db, "users"));
  //       // TODO: Add queries of anothers collections
  //       console.log('FROM FIRESTORE')
  //       const users = [];
  //       queryUsersSnapshot.forEach((doc) => {
  //         users.push({ ...doc.data() });
  //       });
  //       sessionStorage.setItem('users',JSON.stringify(users))
  //       addInitialUsers(users);
  //     }
  //   } catch (error) {
  //     console.warn(error.message);
  //   }
  // };
  const handleInitialData = async () => {
    try {
        // Si hay data en el cache, getDocsFromCache recuperara la data y sino, caera en el bloque catch
        const queryUsersSnapshot = await getDocsFromCache(collection(db, "users"))
         // TODO: Add queries of anothers collections
        const users = []
        queryUsersSnapshot.forEach((doc) => {
                   users.push({ ...doc.data() });
               });
        addInitialUsers(users)
      }
    catch (error) {
      console.warn(error.message);
      // Este bloque se ejecutara si no hay documentos en el cache6
      try{
        const queryUsersSnapshot = await getDocs(collection(db, "users"));
        // TODO: Add queries of anothers collections
        const users = [];
        queryUsersSnapshot.forEach((doc) => {
          users.push({ ...doc.data() });
        });
        addInitialUsers(users);

      }catch(error){console.warn(error.message)}
    }
  };

  const handleAddUser = async (user) => {

    try {
      //toggleLoader()
      const docSnap = await getDoc(userRef(user.userId));
      if (docSnap.exists()) {
        return "El usuario a registrar ya existe";
      } else {
        await setDoc(doc(db, "users", user.userId), user);
        addUser(user);
      }
      //toggleLoader()
    } catch (err) {
      // toggleLoader()
      console.warn(err.message);
    }
  };

  const handleAddTicket = async (payload, id) => {
    try {
      //toggleLoader()
      const docSnap = await getDoc(userRef(id));
      if (!docSnap.data().tickets) {
        await updateDoc(userRef(id), {
          tickets: [payload],
        });
        console.log('ADDING TICKET for first time',payload)
        addTicket(payload, id);
      } else {
        const {tickets} = docSnap.data()
        if(!tickets.filter(ticket => ticket.ticketId === payload.ticketId).length > 0){
          await updateDoc(userRef(id), {
            tickets: arrayUnion(payload),
          });
          addTicket(payload, id);
          toasts('Ticket agregado')

        } else {
          toasts('Este ticket ya existe')
        }
      }

      //toggleLoader()
    } catch (err) {
      //toggleLoader();
      console.warn(err.message);
    }
  };

  return {
    handleInitialData,
    handleAddUser,
    handleAddTicket,
    state,
  };
};

export default useInitialState;
