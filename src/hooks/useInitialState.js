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
import formatDataFromFirestore from "../utils/formatDataFromFirestore";

const useInitialState = () => {
  const [state, setState] = useState(initialState);
  const userRef = (id) => doc(db, "users", id);
  const usersCollectionRef = collection(db,'users')
  const micronodesCollectionRef = collection(db,'micronodes')

  // const addInitialUsers = (users) => {
  //   setState({
  //     ...state,
  //     users,
  //   });
  // };
  // const addInitialMicronodes = (micronodes) => {
  //   setState({
  //     ...state,
  //     micronodes
  //   })
  // }
  const addInitialData = ({users, micronodes}) => {
    setState({
      ...state,
      users,
      micronodes
    })
  }

  const addUser = (user) => {
    setState({
      ...state,
      users: [...state.users, user],
    });
  };

  const addTicket = (payload, id) => {
    //Nota. No utilizar arrays en el estado a menos que
    //estes seguro que no se modificaran sus datos internos a futuro
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
  const handleInitialData = async () => {
    try {

        const queryUsersSnapshot = await getDocsFromCache(usersCollectionRef)
        const queryMicronodesSnapshot = await getDocsFromCache(micronodesCollectionRef)

        if(!queryUsersSnapshot.empty && !queryMicronodesSnapshot.empty){
          // Si hay data en el cache, getDocsFromCache recuperara la data y el atributo .empty sera falso
          addInitialData({
            users: formatDataFromFirestore(queryUsersSnapshot),
            micronodes: formatDataFromFirestore(queryMicronodesSnapshot)
          })
        }else{
          // Si no hay data en cache, recupero desde Firestore
          const queryUsersSnapshot = await getDocs(usersCollectionRef);
          const queryMicronodesSnapshot = await getDocs(micronodesCollectionRef)
          addInitialData({
            users: formatDataFromFirestore(queryUsersSnapshot),
            micronodes: formatDataFromFirestore(queryMicronodesSnapshot)
          })

        }
      }catch(error){console.warn(error.message)}
  };

  // const handleInitialData = async () => {
  //   try {
  //       // Si hay data en el cache, getDocsFromCache recuperara la data y sino, caera en el bloque catch
  //       const queryUsersSnapshot = await getDocsFromCache(usersCollectionRef)
  //       const queryMicronodesSnapshot = await getDocsFromCache(micronodesCollectionRef)

  //       console.log('FC micronodesnapshot', queryMicronodesSnapshot)
  //       console.log('FC userssnapshot', queryUsersSnapshot)
  //        // TODO: Add queries of anothers collections
  //       const users = formatDataFromFirestore(queryUsersSnapshot)
  //       const micronodes = formatDataFromFirestore(queryMicronodesSnapshot)
  //       if(users.length > 0 && micronodes.length > 0){
  //         addInitialUsers(users)
  //         addInitialMicronodes(micronodes)
  //       } else {
  //         throw null;
  //       }

  //     }
  //   catch (error) {
  //     console.warn(error.message);
  //     // Este bloque se ejecutara si no hay documentos en el cache
  //     try{
  //       const queryUsersSnapshot = await getDocs(usersCollectionRef);
  //       const queryMicronodesSnapshot = await getDocs(micronodesCollectionRef)
  //       // TODO: Add queries of anothers collections
  //       const users = formatDataFromFirestore(queryUsersSnapshot);
  //       const micronodes = formatDataFromFirestore(queryMicronodesSnapshot)

  //       console.log('FF users', users)
  //       console.log('FF micronodes',micronodes)
  //       addInitialUsers(users);
  //       addInitialMicronodes(micronodes)

  //     }catch(error){console.warn(error.message)}
  //   }
  // };

  const handleAddUser = async (user) => {

    try {
      const docSnap = await getDoc(userRef(user.userId));
      if (docSnap.exists()) {
        return "El usuario a registrar ya existe";
      } else {
        await setDoc(doc(db, "users", user.userId), user);
        addUser(user);
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  const handleAddTicket = async (payload, id) => {
    try {
      const docSnap = await getDoc(userRef(id));
      if (!docSnap.data().tickets) {
        await updateDoc(userRef(id), {
          tickets: [payload],
        });
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
    } catch (err) {
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
