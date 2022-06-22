import React, { useEffect, useState } from "react";
import Users from "./Users";
import ReactPaginate from "react-paginate";
import SearchUser from "./SearchUser";
import Loader from "./Loader";

const UsersTable = ({users}) => {
  const [search, setSearch] = useState(users);
  const [pageNumber, setPageNumber] = useState(0);
  const [loader,setLoader] = useState(true)
  const usersPerPage = 5;
  let itemsVisited = 0

  useEffect(() => {
    if(users.length !== 0 ){
      setSearch(users)
      setLoader(false)
    }
  },[users])


  if(loader){
    return (
      <div className="col s12 table-container">
        <div className="card-panel z-depth-3">
          <Loader container='center' color='orange-loader' size='small'/>
        </div>
      </div>
    )
  }


  if(pageNumber === 0){
    itemsVisited = 0
  }else{
    //El -1 se coloca para que el array displayUsers tome en cuenta el primer elemento
    itemsVisited = pageNumber * usersPerPage
  }

  const displayUsers = search.slice(itemsVisited, itemsVisited + usersPerPage )
  const pageCount = Math.ceil(search.length/usersPerPage)
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };


  return (
    <div className="col s12 table-container">
      <SearchUser users={users} setSearch={setSearch} />
      <div className="card-panel z-depth-3">
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
