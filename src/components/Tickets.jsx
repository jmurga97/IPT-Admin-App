import React from "react";
import dayjs  from 'dayjs'
import {es} from 'dayjs/locale/es'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'


const Tickets = ({ticket}) => {
  dayjs.locale('es')
  let date = ''
  let time = ''
  let timestamp = ''

  //Firebase regresa un objeto timestamp que debe ser convertido al objeto Date de JS. Si el ticket es agregado mientras se usa la app, no haria falta utilizar toDate
  if(ticket.timestamp instanceof Date){
    timestamp = dayjs(ticket.timestamp)
  }else{
    timestamp = dayjs(ticket.timestamp.toDate())
  }
  date = timestamp.format("dddd, MMMM D YYYY")
  time = timestamp.format("HH:mm:ss a")
  return (
    <tr>
      <td>{ticket.ticketId}</td>
      <td>{date}</td>
      <td>{time}</td>
    </tr>
  );
};

export default Tickets;
