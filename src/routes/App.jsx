import React, { useEffect, useState } from "react";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";
import Register from "../containers/Register";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useInitialState from "../hooks/useInitialState";
import AppContext from "../context/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fbconfig";

const App = () => {
  const initialState = useInitialState();
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setAuthUser(currentUser);
        navigate('/')
      } else {
        setAuthUser(null);
        navigate('/signin')
      }
    });
  }, [authUser]);

//   useEffect(() => {
//     initialState.handleInitialData();
//   }, []);



  return (
    <AppContext.Provider value={{initialState,setAuthUser}}>
      {!authUser ? null : <Navbar/>}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
