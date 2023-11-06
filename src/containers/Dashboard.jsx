import React, { useContext, useEffect } from "react";
import KioskoCard from "../components/KioskoCard";
import TicketsCard from "../components/TicketsCard";
import MicronodesCard from "../components/MicronodesCard";
import UsersTable from "../components/UsersTable";
import "../styles/Dashboard.css";
import AppContext from "../context/AppContext";


const Dashboard = () => {

  const {initialState} = useContext(AppContext)
  const { handleInitialData } = initialState;
  const {users,micronodes,authedKiosko, ticketCounter} = initialState.state

  useEffect(() => {
    handleInitialData();
  }, []);

  return (
    <div className="page-container ipt-background">
      <div className="row">
        <KioskoCard authedKiosko={authedKiosko}/>
        <TicketsCard counter = {ticketCounter}/>
        <MicronodesCard   micronodes={micronodes}/>
      </div>
      <div className="row">
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
