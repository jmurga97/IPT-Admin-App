import React, { useEffect, useState } from "react";
import Users from "./Users";
import ReactPaginate from "react-paginate";
import SearchUser from "./SearchUser";
import Loader from "./Loader";
import pagination from "../utils/pagination";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function table(search, usersPerPage, paginationParameters, users) {
  return (
    <>
      <table style={{display:'none'}} className="responsive-table centered striped centered" id="users">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Sector</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Red WiFi</th>
            <th>Añadir Ticket</th>
            <th>Info Tickets</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <Users key={user.userId} user={user} />
          ))}
        </tbody>
      </table>
      <table className="responsive-table centered striped centered">
        <thead>
          <tr>
            <th>Cedula</th>
            <th>Nombre</th>
            <th>Sector</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Red WiFi</th>
            <th>Añadir Ticket</th>
            <th>Info Tickets</th>
          </tr>
        </thead>
        <tbody>
          {search.length <= usersPerPage
            ? search.map((user) => <Users key={user.userId} user={user} />)
            : paginationParameters.displayItems.map((user) => (
                <Users key={user.userId} user={user} />
              ))}
        </tbody>
      </table>
    </>
  );
}

const UsersTable = ({ users }) => {
  const [search, setSearch] = useState(users);
  const [pageNumber, setPageNumber] = useState(0);
  const [loader, setLoader] = useState(true);
  const usersPerPage = 5;

  useEffect(() => {
    if (users.length !== 0) {
      setSearch(users);
      setLoader(false);
    }
  }, [users]);

  if (loader) {
    return (
      <div className="col s12 table-container">
        <div className="card-panel z-depth-3">
          <Loader container="center" color="orange-loader" size="small" />
        </div>
      </div>
    );
  }

  const paginationParameters = pagination(usersPerPage, pageNumber, search);
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="col s12 table-container">
      <SearchUser users={users} setSearch={setSearch} />
      <ReactHTMLTableToExcel
        className="btn waves-effect waves-light margin-top"
        table="users"
        filename={`Tabla data de Usuarios IPT`}
        sheet="Usuarios"
        buttonText="Descargar Tabla"
      />
      <div className="card-panel z-depth-3">
        {table(search, usersPerPage, paginationParameters, users)}
        <ReactPaginate
          previousLabel={"Prev"}
          nextLabel={"Next"}
          pageCount={paginationParameters.pageCount}
          onPageChange={pageChange}
          containerClassName={"pagination pages"}
          activeClassName={"active orange waves-effect"}
        />
      </div>
    </div>
  );
};

export default UsersTable;
