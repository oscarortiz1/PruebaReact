import React, { useState } from "react";
import "firebase/auth";
import { singIn } from "../Services/Auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState();
  const submit = async () => {
    if (!email || !password) {
      setAlert("Ingresar todos los campos");
    } else {
      try {
        const response = await singIn(email, password);
        console.log(response);
      } catch (error) {
        switch (error.code) {
          case "auth/wrong-password":
            setAlert("Error en las credenciales");
            break;
          case "auth/too-many-requests":
            setAlert(
              "Demasiados intentos, por favor intenta iniciar sesión más tarde"
            );
            break;
          case "auth/user-not-found":
            setAlert("Usuario no encontrado, registrate para acceder.");
            break;
          default:
            if (error.message === "missing-fields") {
              setAlert("Completa todos los campos.");
            } else {
              setAlert(
                `Error al iniciar sesión: Por favor comuniquese con los desarrolladores. ${error}`
              );
            }
            break;
        }
      }
    }
  };
  return (
    <form
      className="card card-body"
      style={{ width: "40em", top: "30%", left: "32%", position: "absolute"}}
    >
      <div className="form-group">
        <h1 style={{ textAlign: "center " }}>Ingresar</h1>
        <br />
        <input
          type="email"
          className="form-control"
          placeholder="Correo: oscar@gmail.com"
          id="email"
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <br />
        <input
          type="password"
          className="form-control"
          placeholder="Contraseña: 123456"
          id="password"
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <br />
        <button
          type="button"
          class="btn btn-primary btn-lg btn-block"
          onClick={submit}
        >
          Ingresar
        </button>
        {alert && <p class="text-danger" > {alert} </p>}
      </div>
    </form>
  );
};

export default Login;
