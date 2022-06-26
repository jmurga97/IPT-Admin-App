import React, { useEffect, useState, useRef, useContext } from "react";
import Loader from "../components/Loader";
import ReactPaginate from "react-paginate";
import getYearList from "../utils/getYearList.js";
import AppContext from "../context/AppContext";
import Tickets from "../components/Tickets";
import "../styles/AllTickets.css";
import M from "materialize-css";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import pagination from "../utils/pagination";

const AllTickets = () => {
  const [loader, setLoader] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const { initialState } = useContext(AppContext);
  const {tickets} = initialState.state
  const form = useRef(null);
  const yearList = getYearList();
  const ticketsPerPage = 15;
  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  const date = new Date().toLocaleDateString();

  useEffect(() => {
    M.AutoInit();
  }, []);

  const onSearchTickets = (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData(form.current);
    const month = Number(formData.get("month"));
    const year = formData.get("year");
    initialState
      .handleSearchTickets(`0${month}`, year, `0${month + 1}`)
        .then(()=>setLoader(false))
  };

  const {displayItems,pageCount} = pagination(ticketsPerPage,pageNumber,tickets)
  const pageChange = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="page-container ipt-background">
      <div className="col s12 table-container">
        <div className="card-panel z-depth-3">
          <form className="row search-date" onSubmit={(e) => onSearchTickets(e)} ref={form}>
            <div className="input-field col s6 m3">
              <select name="month" required>
                {months.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
              <label>Mes</label>
            </div>
            <div className="input-field col s6 m3">
              <select name="year" required>
                {yearList.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <label>Año</label>
            </div>
            <button
              type="submit"
              className="btn waves-effect waves-light margin-top s6 "
            >
              Buscar
            </button>
            <ReactHTMLTableToExcel
              className="btn waves-effect waves-light right margin-top s6 "
              table="table-to-xls"
              filename={`Tickets ${date}`}
              sheet={date}
              buttonText="Descargar Tabla"
            />
          </form>
          {loader ? (
            <Loader container="center" color="orange-loader" size="small" />
          ) : (
            <table
              className="responsive-table centered striped centered"
              id="table-to-xls"
            >
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
                  : displayItems.map((ticket) => (
                      <Tickets key={ticket.ticketId} ticket={ticket} />
                    ))}
              </tbody>
            </table>
          )}
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

export default AllTickets;
