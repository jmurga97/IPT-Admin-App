import React, { useContext } from "react";
import KioskoCard from "../components/KioskoCard";
import TicketsCard from "../components/TicketsCard";
import MicronodesCard from "../components/MicronodesCard";
import UsersTable from "../components/UsersTable";
import "../styles/Dashboard.css";
import AppContext from "../context/AppContext";

const Dashboard = () => {

  const {initialState} = useContext(AppContext)
  const {users,micronodes} = initialState.state

  return (
    <div className="page-container ipt-background">
      <div className="row">
        <KioskoCard />
        <TicketsCard/>
        <MicronodesCard   micronodes={micronodes}/>
      </div>
      <div className="row">
        <UsersTable users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
