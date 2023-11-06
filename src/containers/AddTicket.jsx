import React, { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AppContext from "../context/AppContext";
import formatName from "../utils/formatName";
import "../styles/AddTicket.css";
import Loader from "../components/Loader";
import toasts from "../utils/toasts";
import axios from "axios";
import onAddTicketCounter from "../utils/onAddTicketCounter";
import M from "materialize-css";

const AddTicket = () => {
  const { id } = useParams();
  const ticketForm = useRef(null);

  const [error, setError] = useState("");
  //const ticketCounter = useRef(0)
  const [dolar, setDolar] = useState(0);
  const [dateDolar, setDateDolar] = useState("");
  const [loader, setLoader] = useState(false);

  const { initialState } = useContext(AppContext);
  const { users, authedKiosko, ticketCounter } = initialState.state;
  const {addTicketCounter} = initialState
  const [userDetail] = users.filter((user) => user.userId.toString() === id);

  useEffect(() => {
    M.AutoInit();
  }, []);

  useEffect(() => {
    const getDolarTodayData = async () => {
      try {
        setLoader(true);
        const response = await axios.get(
          `https://s3.amazonaws.com/dolartoday/data.json`
        );
        setDolar(response.data["USD"].sicad2);
        setDateDolar(response.data["_timestamp"].fecha_nice);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoader(false);
      }
    };
    getDolarTodayData();
  }, []);

  const onAddTicket = (e) => {
    e.preventDefault();
    setError("");
    setLoader(true);
    const ticketFormData = new FormData(ticketForm.current);
    const ticket = [
      ticketFormData.get("ticket"),
      ticketFormData.get("ticketConfirm"),
      ticketFormData.get("paytype"),
      ticketFormData.get("monto"),
    ];
    if (ticket[0] === ticket[1]) {
      const payload = {
        ticketId: ticket[0],
        timestamp: new Date(),
        paytype: ticket[2],
        monto: ticket[3],
        kiosko: authedKiosko[0].name
      };

      initialState.handleAddTicket(payload, id).then((msg) => {
        if (msg) {
          toasts(msg);
        } else {
          toasts("Ticket Agregado");
        }
        setLoader(false);
        ticketForm.current.reset();
        return msg
      }).then((msg) => {
        if(!msg){
          //Add Ticket counter to State
          addTicketCounter()
          //Handle counter on localStorage and uploading data to Firestore if the date changes
          //Add +1 on onAddTicketCounter because of async behavior of setState
          onAddTicketCounter(authedKiosko[0].docId.trim(),initialState.handleAddTicketCounter, ticketCounter + 1)
        }
      });
    } else {
      setError("La información proporcionada no coincide");
      setLoader(false);
      ticketForm.current.reset();
    }
  };

  if (!userDetail) {
    toasts("Este usuario no existe");
  }

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
                  {loader && <Loader color="orange-loader" size="small" />}
                </div>
                <div className="input-field col s12 m6 l6">
                  <input id="ticket" name="ticket" type="text" required />
                  <label htmlFor="ticket">Código del ticket</label>
                </div>
                <div className="input-field col s12 m6 l6">
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

                <div className="input-field col s12">
                  <select name="paytype" required>
                    <option value="debito">Tarjeta de débito</option>
                    <option value="bolivares">Bolívares Efectivo</option>
                    <option value="dolares">Dólares Efectivo</option>
                  </select>
                  <label>Elija un tipo de pago</label>
                </div>
                <div className="divider"></div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      id="monto"
                      name="monto"
                      type="number"
                      required
                      min="0"
                      step=".01"
                      pattern="[0-9]+"
                    />
                    <label htmlFor="ticketConfirm">Monto a cobrar</label>
                  </div>

                  <div className="col s12 ">
                    <b>
                      Dólar Banco Central de Venezuela -{" "}
                      {dateDolar && dateDolar}
                    </b>
                    <p>BCV: {dolar && dolar} Bs</p>
                  </div>

                  {/* <div className="col s12">
                    <b>Monto: </b> <span>{dolar && Number(dolar*3).toFixed(2)} Bs</span>
                  </div> */}
                </div>
              </div>
              <div className="card-action">
                <button type="submit" className="btn waves-effect waves-light">
                  Agregar Ticket
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
