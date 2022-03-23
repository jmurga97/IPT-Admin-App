import React, { useEffect, useState } from "react";
import Login from "../containers/Login";
import Dashboard from "../containers/Dashboard";
import Register from "../containers/Register";
import AddTicket from "../containers/AddTicket";
import InfoTicket from "../containers/InfoTicket";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import useInitialState from "../hooks/useInitialState";
import AppContext from "../context/AppContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/fbconfig";
import ProtectedRoute from "../containers/ProtectedRoutes";
import Loader from "../components/Loader";

/** TODO:
 *
 *
 * */
const App = () => {
  const initialState = useInitialState();
  const {handleInitialData} = initialState
  const [authUser, setAuthUser] = useState("unknown");

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setAuthUser(currentUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  }, []);

    useEffect(() => {
      handleInitialData();
    }, []);



  if (authUser === "unknown") {
    //Size solo puede ser big o small y color solo puede ser spinner-blue-only, white o orange
    return <Loader container='init-loader center' color='spinner-blue-only' size='big'/>;
  }

  return (
    <AppContext.Provider
      value={{ initialState, setAuthUser, authUser }}
    >
      {!authUser ? null : <Navbar />}
      <Routes>
        <Route
          path="/signin"
          element={
            <ProtectedRoute user={authUser}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          index
          element={
            <ProtectedRoute user={authUser}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute user={authUser}>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addticket/:id"
          element={
            <ProtectedRoute user={authUser}>
              <AddTicket />
            </ProtectedRoute>
          }
        />
        <Route
          path="/infoticket/:id"
          element={
            <ProtectedRoute user={authUser}>
              <InfoTicket />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
