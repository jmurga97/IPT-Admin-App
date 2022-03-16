import React, { useContext, useEffect, useRef, useState } from "react";
import Users from "./Users";
import ReactPaginate from "react-paginate";
import AppContext from "../context/AppContext";
import SearchUser from "./SearchUser";
import MdNavigateBefore from "react-icons/md";
import MdNavigateNext from "react-icons/md";

const UsersTable = () => {
  const { initialState } = useContext(AppContext);
  const users = initialState.state.users;
  const [search, setSearch] = useState(users);
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 5;
  const itemsVisited = pageNumber + usersPerPage;
  const displayUsers = search.slice(itemsVisited, itemsVisited + usersPerPage);

  const pageCount = Math.ceil(search.length / usersPerPage);
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="col s12 table-container">
      <SearchUser users={users} setSearch={setSearch} />
      <div className="card-panel z-depth-3">
        <table className="responsive-table centered striped">
          <thead>
            <tr>
              <th>Cedula</th>
              <th>Nombre</th>
              <th>Sector</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Red WiFi</th>
              <th>Agregar Ticket</th>
            </tr>
          </thead>
          <tbody>
            {search.length <= usersPerPage
              ? search.map((user) => <Users key={user.userId} user={user} />)
              : displayUsers.map((user) => (
                  <Users key={user.userId} user={user} />
                ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={pageChange}
          containerClassName={"pagination pages"}
          activeClassName={"active orange waves-effect"}
        />
      </div>
    </div>
  );
};

export default UsersTable;
