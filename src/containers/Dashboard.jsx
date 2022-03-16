import React from "react";
import KioskoCard from "../components/KioskoCard";
import TicketsCard from "../components/TicketsCard";
import MicronodesCard from "../components/MicronodesCard";
import UsersTable from "../components/UsersTable";
import "../styles/Dashboard.css";

const Dashboard = () => {

  return (
    <div className="dashboard-container ipt-background">
      <div className="row">
        <KioskoCard />
        <TicketsCard />
        <MicronodesCard />
      </div>
      <div className="row">
        <UsersTable />
      </div>
    </div>
  );
};

export default Dashboard;
