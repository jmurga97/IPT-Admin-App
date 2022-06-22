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
import AllTickets from "../containers/AllTickets";

/** TODO:
 *
 *
 * */
const App = () => {
  const initialState = useInitialState();
  const [authUser, setAuthUser] = useState("unknown");

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, (currentUser) => {
      currentUser ? setAuthUser(currentUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
  }, []);

  if (authUser === "unknown") {
    //Size solo puede ser big o small y color solo puede ser spinner-blue-only, white o orange
    return (
      <Loader
        container="init-loader center"
        color="spinner-blue-only"
        size="big"
      />
    );
  }

  return (
    <AppContext.Provider value={{ initialState, setAuthUser, authUser }}>
      {!authUser ? null : <Navbar />}
      <Routes>
        <Route element={<ProtectedRoute user={authUser} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addticket/:id" element={<AddTicket />} />
          <Route path="/infoticket/:id" element={<InfoTicket />} />
        </Route>
        {!authUser ? null : (
          <Route
            path="/tickets"
            element={
              <ProtectedRoute
                user={authUser}
                isAllowed={authUser.email === "soporte@voxtel.com.ve"}
              >
                <AllTickets />
              </ProtectedRoute>
            }
          />
        )}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppContext.Provider>
  );
};

export default App;
