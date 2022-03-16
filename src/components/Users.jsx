import React from 'react';
import { AiFillFileAdd } from "react-icons/ai";

const Users = ({user}) => {
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
                  <td>
                    <button>
                      <AiFillFileAdd />
                    </button>
                  </td>
                </tr>
     );
}

export default Users;