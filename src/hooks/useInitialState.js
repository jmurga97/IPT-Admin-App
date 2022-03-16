import { useState } from "react";
import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import initialState from "../initialState";
import { db } from "../config/fbconfig";
import { async } from "@firebase/util";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addInitialUsers = (users) => {
    setState({
      ...state,
      users,
    });
  };

  const addUser = (user) => {
    setState({
      ...state,
      users: [...state.users, user]
    })
  }


  const handleInitialData = async () => {
    try {
    //   const queryUsersSnapshot = await getDocs(collection(db, "users"));
    //   // Add queries of anothers collections
    //   const users = [];
    //   queryUsersSnapshot.forEach((doc) => {
    //     users.push({ ...doc.data() });
    //   });
    //   addInitialUsers(users);
    } catch (error) {
      console.warn(error.message);
    }
  };
  const handleAddUser = async (user) => {
    try{
      const docSnap = await getDoc(doc(db,'users',user.userId))
      if(docSnap.exists()){
        return 'El usuario a registrar ya existe'
      }else{
        await setDoc(doc(db,'users',user.userId),user)
        addUser(user)
      }

    }catch(err){
      console.warn(err.message)
    }
  }

  return {
    handleInitialData,
    handleAddUser,
    state,
  };
};

export default useInitialState;
