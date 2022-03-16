import React from "react";
import { AiFillFileAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Users = ({ user }) => {
  const navigate = useNavigate()
  const onTicketNavigate = () =>{
    navigate(`/addticket/${user.userId}`)
  }
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
      <td className="center">
        <button onClick={onTicketNavigate} className="btn-floating waves-effect waves-light blue center">
          <AiFillFileAdd color="white" className="btn-logo"/>
        </button>
      </td>
    </tr>
  );
};

export default Users;
