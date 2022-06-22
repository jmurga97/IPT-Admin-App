import React, { useContext, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Tickets from "../components/Tickets";
import AppContext from "../context/AppContext";
import ReactPaginate from "react-paginate";
import formatName from "../utils/formatName";
import { AiFillFileAdd } from "react-icons/ai";

const InfoTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { initialState } = useContext(AppContext);
  const [pageNumber, setPageNumber] = useState(0);
  const users = initialState.state.users;

  if (users.length === 0) {
    return <Navigate to="/" replace />;
  }

  const [userDetail] = users.filter(
    (userDetail) => userDetail.userId.toString() === id
  );

  const tickets = userDetail.tickets;
  const onAddTicket = () => {
    navigate(`/addticket/${id}`);
  };
  //Pagination parameters
  const ticketsPerPage = 12;
  const itemsVisited = pageNumber + ticketsPerPage;
  let displayTickets = null;
  let pageCount = null;
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  if (!tickets) {
    return (
      <div className="page-container ipt-background">
        <div className="card-panel">
          <p>Este usuario no tiene registrado tickets a su nombre</p>
          <button
            onClick={onAddTicket}
            type="button"
            className="btn waves-effect waves-light"
          >
            Agregar Ticket
          </button>
        </div>
      </div>
    );
  } else {
    displayTickets = tickets.slice(itemsVisited, itemsVisited + ticketsPerPage);
    pageCount = Math.ceil(tickets.length / ticketsPerPage);
  }
  return (
    <div className="page-container ipt-background">
      <div className="card white black-text">
        <div className="card-content">
          <div className="card-title">
            {formatName(userDetail.name, userDetail.lastName)}
          </div>
          <div className="row">
            <div className="col s9">
              <ul>
                <li>
                  <b>Cédula:</b> {userDetail.userId ? userDetail.userId : "-"}
                </li>
                <li>
                  <b>Sector donde vive:</b>{" "}
                  {userDetail.sector ? userDetail.sector : "-"}
                </li>
                <li>
                  <b>Correo: </b> {userDetail.email ? userDetail.email : "-"}
                </li>
                <li>
                  <b>Teléfono:</b> {userDetail.phone ? userDetail.phone : "-"}
                </li>
                <li>
                  <b>Red WiFi:</b>{" "}
                  {userDetail.ssidConnection ? userDetail.ssidConnection : "-"}
                </li>
              </ul>
            </div>
            <div className="col s3 center">
              <button
                onClick={onAddTicket}
                className="btn-floating btn-large hoverable waves-effect waves-light blue center pulse"
              >
                {" "}
                <AiFillFileAdd color="white" className="btn-logo" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col s12 table-container">
        <div className="card-panel z-depth-3">
          <table className="responsive-table centered striped">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>Usuario</th>
                <th>Monto Bs.</th>
                <th>Tipo de Pago</th>
                <th>Kiosko</th>
                <th>Fecha de Pago</th>
              </tr>
            </thead>
            <tbody>
              {tickets.length <= ticketsPerPage
                ? tickets.map((ticket) => (
                    <Tickets key={ticket.ticketId} ticket={ticket} />
                  ))
                : displayTickets.map((ticket) => (
                    <Tickets key={ticket.ticketId} ticket={ticket} />
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
    </div>
  );
};

export default InfoTicket;
