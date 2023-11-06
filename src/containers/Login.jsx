import React, { useContext, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/fbconfig";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toasts from "../utils/toasts";
import Input from "../components/lil-components/Input";
import SimpleLayout from "../components/lil-components/SimpleLayout";
import Form from "../components/lil-components/Form";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { setAuthUser } = useContext(AppContext);
  const navigate = useNavigate();

  const onLogin = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    try {
      const currentUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setAuthUser(currentUser);
      navigate("/");
    } catch (err) {
      toasts("Contraseña Incorrecta");
    }
  };

  return (
    <SimpleLayout title="IPT Admin App" subtitle="Por favor, inicie sesión">
      <Form btnText="Iniciar sesión" onSubmitting={onLogin}>
        <Input
          id="user"
          name="username"
          type="email"
          ref={emailRef}
          label="Usuario"
        />
        <Input
          id="password"
          name="password"
          type="password"
          ref={passwordRef}
          label="Contraseña"
        />
      </Form>
    </SimpleLayout>
  );
};

export default Login;
