import React from "react";
import formatDate from "../utils/formatDate";

const Tickets = ({ticket}) => {
  const date = formatDate(ticket.timestamp)

  return (
    <tr>
      <td>{ticket.ticketId}</td>
      <td>{ticket.userId}</td>
      <td>{ticket.monto}</td>
      <td>{ticket.paytype}</td>
      <td>{ticket.kiosko}</td>
      <td>{date}</td>
    </tr>
  );
};

export default Tickets;
