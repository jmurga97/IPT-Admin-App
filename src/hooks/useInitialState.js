import { useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import initialState from "../initialState";
import { db } from "../config/fbconfig";

const useInitialState = () => {
  const [state, setState] = useState(initialState);

  const addInitialUsers = (users) => {
    setState({
      ...state,
      users,
    });
  };



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

  return {
    handleInitialData,
    state,
  };
};

export default useInitialState;
