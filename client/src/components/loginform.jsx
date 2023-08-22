import React, { useState, useEffect } from "react";
import Logo from "../assets/img/Logo.png";
import "../assets/css/LoginForm.css";
import { Login } from "../api/login.api"; // Importa la función de inicio de sesión
import { Notification } from "./Notification";
const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLogoAnimated, setIsLogoAnimated] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await Login(username, password);
      console.log(response.status);
      if (response.status == 400) {
        location.replace("/home");
      } // Realiza acciones adicionales después de iniciar sesión exitosamente
    } catch (error) {
      if(!username && !password){
setNotification({
          msg: "Ingrese su usuario y contraseña ",
          color: "primary",
          buttons: false,
          timeout: 3000,
        });
      }
      else if (!username) {
        setNotification({
          msg: "Ingrese su usuario",
          color: "primary",
          buttons: false,
          timeout: 3000,
        });
      }else if(!password){
        setNotification({
          msg: "Ingrese su contraseña",
          color: "primary",
          buttons: false,
          timeout: 3000,
        });
      }else if(error){
        setNotification({
          msg: "Credenciales inválidas",
          color: "primary",
          buttons: false,
          timeout: 3000,
        });
      }
      
      // Maneja el error de inicio de sesión
    }
  };

  useEffect(() => {
    // Cuando el componente se monta, después de 1 segundo, mostrarlo
    setTimeout(() => {
      setIsLogoAnimated(true); // Inicia la animación del logo
    }, 1000);

    // Detener la animación del logo después de 2 segundos
    setTimeout(() => {
      setIsLogoAnimated(false);
    }, 3000);
  }, []);


  return (
    <form className="form-login" onSubmit={handleLogin}>
      <div className="notifications" />
      <div className="hero-body has-text-centered">
        <div className="container">
          <div className="columns is-centered">
          <div className="column is-half has-background-white columna slide-in-right">
              <div className="notifications float">
                {notification && (
                  <Notification
                    msg={notification.msg}
                    color={notification.color}
                    buttons={notification.buttons}
                    timeout={notification.timeout}
                    onClose={() => setNotification(null)}
                    onConfirm={notification.onConfirm}
                  />
                )}
              </div>
              <header className="card-header">
                <div className="media">
                <img
                    src={Logo}
                    alt="Logo"
                    width="230px"
                    className={`logo ${
                      isLogoAnimated ? "logo-animation" : ""
                    }`}
                  />
                </div>
              </header>
              <div className="card-content px-6">
                <div className="content">
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Usuario</label>
                    </div>
                    <div className="field-body">
                      <div className="field has-addons has-addons-centered m-1">
                      <p className="control" >
                          <button  type="button"className="button  is-primary">
                          <span className="icon  is-left">
                            <i className="fa-solid fa-user-tie" />
                          </span>
                          </button>
                        </p>
                        <p className="control is-expanded">
                          <input
                            className="input"
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">
                        Contraseña
                      </label>
                    </div>
                    <div className="field-body">
                      <div class="field has-addons has-addons-centered p-2">
                        <p className="control" >
                          <button  type="button"className="button  is-primary">
                          <span className="icon  is-left">
                            <i className="fa-solid fa-key" />
                          </span>
                          </button>
                        </p>
                        <p className="control is-expanded">
                          <input 
                            className="input"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </p>
                        <p className="control">
                          <button
                            type="button"
                            className="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className="icon is-small">
                              <i
                                className={
                                  showPassword
                                    ? "fa-solid fa-eye"
                                    : "fa-solid fa-eye-slash"
                                }
                              />
                            </span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>

                  <button className="button is-primary" type="submit">
                    Iniciar sesión
                  </button>
                  <br />
                  <br />
                  {/* <a
                    className="is-link contra"
                    type="button"
                    name="recuperar"
                    href="/recuperar"
                  >
                    ¿Olvidaste tu contraseña?
                  </a> */}
                  
                  <a className="is-link contra" href="/registro">
                    ¿Aún no tienes una cuenta?
                  </a>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
