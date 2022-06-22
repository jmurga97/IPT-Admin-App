import React, { useEffect, useRef } from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { BsInfo } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Users = ({ user }) => {
  const navigate = useNavigate();

  const onTicketAddNavigate = () => {
    navigate(`/addticket/${user.userId}`);
  };
  const onTicketInfoNavigate = () => {
    navigate(`/infoticket/${user.userId}`);
  };


  return (
    <tr>
      <td>{user.userId}</td>
      <td>
        {user.name && user.lastName
          ? `${user.name.toUpperCase()} ${user.lastName.toUpperCase()}`
          : "-"}
      </td>
      <td>{user.sector ? user.sector : "-"}</td>
      <td>{user.email ? user.email : "-"}</td>
      <td>{user.phone ? user.phone : "-"}</td>
      <td>{user.ssidConnection ? user.ssidConnection : "-"}</td>
      <td className="tickets">
        <button
          onClick={onTicketAddNavigate}
          className="btn-floating waves-effect waves-light blue center ticket-btn"
        >
          <AiFillFileAdd color="white" className="btn-logo" />
        </button>


      </td>
      <td className="tickets" >
      <button
          onClick={onTicketInfoNavigate}
          className="btn-floating tooltipped waves-effect waves-light blue center ticket-btn"
        >
          <BsInfo color="white" className="btn-logo" />
        </button>
      </td>
    </tr>
  );
};

export default Users;
