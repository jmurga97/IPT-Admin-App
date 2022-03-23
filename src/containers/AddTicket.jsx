import React, { useContext, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import formatName from "../utils/formatName";
import "../styles/AddTicket.css";
import Loader from "../components/Loader";
import toasts from '../utils/toasts'

const AddTicket = () => {
  const { id } = useParams();
  const ticketForm = useRef(null);
  const [error, setError] = useState("");
  let [loader,setLoader] = useState(false)
  const navigate = useNavigate()
  const { initialState } = useContext(AppContext);
  const { users } = initialState.state;
  const [userDetail] = users.filter((user) => user.userId.toString() === id);

  const onGoToInfoTickets = () => {
    navigate(`/infoticket/${id}`)
  }



  const onAddTicket = (e) => {
    e.preventDefault();
    setError("")
    setLoader(true)
    const ticketFormData = new FormData(ticketForm.current);
    const ticket = [
      ticketFormData.get("ticket"),
      ticketFormData.get("ticketConfirm")
    ];
    if (ticket[0] === ticket[1]) {
      const payload = {
        ticketId: ticket[0],
        timestamp: new Date(),
      };

      initialState.handleAddTicket(payload, id)
        .then(()=>setLoader(false));

    } else {
      setError("La información proporcionada no coincide");
      setLoader(false)
      ticketForm.current.reset();
    }
  };

  if (!userDetail) {
    toasts('Este usuario no existe')
  }
  //console.log('LOADER',loader)

  return (
    <div className="page-container ipt-background">
      <div className="container">
        {userDetail ? (
          <form onSubmit={(e) => onAddTicket(e)} ref={ticketForm}>
            <div className="card white black-text">
              {error !== "" ? <span className="red-text">{error}</span> : null}
              <div className="row card-content">
                <div className="card-title">
                  Añada un nuevo ticket de IPT -{" "}
                  {formatName(userDetail.name, userDetail.lastName)}
                  {loader && <Loader  color='orange-loader' size='small'/>}
                </div>
                <div className="input-field col s6">
                  <input id="ticket" name="ticket" type="text" required />
                  <label htmlFor="ticket">Código del ticket</label>
                </div>
                <div className="input-field col s6">
                  <input
                    id="ticketConfirm"
                    name="ticketConfirm"
                    type="text"
                    required
                  />
                  <label htmlFor="ticketConfirm">
                    Confirme código del ticket
                  </label>
                </div>
              </div>
              <div className="card-action">
                <button type="submit" className="btn waves-effect waves-light">
                  Agregar Ticket
                </button>
                <button onClick={onGoToInfoTickets} type="button" className="btn waves-effect waves-light">
                  Info Tickets
                </button>
              </div>
            </div>
          </form>
        ) : (
          <Navigate to="/" replace />
        )}
      </div>
    </div>
  );
};

export default AddTicket;
