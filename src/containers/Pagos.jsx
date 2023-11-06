import React, { useCallback, useEffect, useRef, useState } from "react";
import SimpleLayout from "../components/lil-components/SimpleLayout";
import Form from "../components/lil-components/Form";
import Input from "../components/lil-components/Input";
import Select from "../components/lil-components/Select";
import M from "materialize-css";

// FORMULARIO DE REGISTRO DE PAGO
// Fecha de Pago

// Metodo de Pago
// Referencia
// Banco de Origen
// Banco destino


const Pagos = () => {

  const [method,setMethod] = useState()

  const cedulaRef = useRef(null)
  const nombreRef = useRef(null)
  const fechaRef = useRef(null)
  const planRef = useRef(null)
  const mesRef = useRef(null)
  const bancoOrigenRef = useRef(null)
  const bancoDestinoRef = useRef(null)
  const referenciaRef = useRef(null)
  const metodoRef = useRef(null)

  const mesDePago = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"]
  const planesIPT = ["Plan 4 Megas", "Plan 6 Megas","Plan 10 Megas"]
  const metodoIPT = ["Transferencia Bancaria", "Pago Móvil", "Efectivo"]
  const onPayment = async (e) => {
    e.preventDefault();
    //const email = emailRef.current.value;
    //const password = passwordRef.current.value;
    console.log('SUBMITTED SUCCESSFULLY')
    try {

    } catch (err) {

    }
  };
  useEffect(() => {
    M.AutoInit();
  }, []);
  // useEffect(()=>{
  //   console.log("METODO REF",method)
  // },[])
  const tipoDePagoRef = useCallback(node => {
    console.log('USE CALLBACK HI')
    setMethod(node.value)
    if(node !== null){
      setMethod(node.value)
    }
  },[])
  // console.log(method)
  return (
    <SimpleLayout title="Pagos IPT Premium" subtitle="Reporte sus pagos mes a mes por nuestra plataforma">
      <Form classname="row" btnText="Enviar Pagos" onSubmitting={onPayment}>
        <Input required={true} ref={cedulaRef} id="cedula" name="cedula" type="text" label="Cédula de Identidad"/>
        <Input required={true} ref={nombreRef} id="nombre" name="nombre" type="text" label="Nombre Completo"/>
        <Select required={false} ref={mesRef} label="Elija el mes que está pagando" name="mes" options={mesDePago}/>
        <Select required={true} ref={planRef} label="Elija el plan que está pagando" name="plan" options={planesIPT}/>
        <Select required={true} ref={tipoDePagoRef}  label="Elija el método de pago" name="metodo" options={metodoIPT}/>
      </Form>
    </SimpleLayout>
  );
};

export default Pagos;
