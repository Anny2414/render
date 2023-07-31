import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import { Notification } from "./Notification";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Estado para almacenar los valores de los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setconfirmPassword] = useState("")
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/yourburger/api/v1/roles/"
      );
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    if (password !== confirmPassword) {
      // Mostrar mensaje de error porque las contraseñas no coinciden
      setNotification({
        msg: "Las contraseñas no coinciden",
        color: "primary",
        buttons: false,
        timeout: 1000,
      });
      return; // Salir de la función sin enviar la petición
    }
    // Objeto con los datos del registro
    const userData = {
      username,
      email,
      password,
      document,
      name,
      lastname,
      address,
      phone,
      role: "Cliente", // Asignar el valor por defecto del rol
    };
    try {
      // Enviar los datos del registro al servidor
      const response = await axios.post(
        "http://127.0.0.1:8000/yourburger/register/",
        userData
      );
      console.log(response.data);
      setNotification({
        msg: "¡Usuario Creado exitosamente!",
        color: "primary",
        buttons: false,
      });
      setUsername("");
      setEmail("");
      setPassword("");
      setconfirmPassword("");
      setDocument("");
      setName("");
      setLastname("");
      setAddress("");
      setPhone(""); // Manejar la respuesta del servidor según sea necesario
      setTimeout(() => {
        window.location.href = "/";
      }, 2000); // Reemplaza "/login" con la URL correcta de tu vista de inicio de sesión
    } catch (error) {
      if (error.response.status == 400) {
        return setNotification({
          msg: "Ya existe este usuario!",
          color: "primary",
          buttons: false,
          timeout: 3000,
        })}
      console.error(error);
      setNotification({
        msg: "Rellene de manera correcta todos los campos",
        color: "info",
        buttons: false,
        timeout: 1000,
      });
    }
  };
  return (
    <section className="hero is-fullheight">
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
      <form className="form-registro" onSubmit={handleSubmit(handleRegister)}>
        <div className="hero-body has-text-centered">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-half has-background-white">
                <div className="card">
                  <header className="card-header">
                    <p className="pt-5" style={{ fontSize: "30px" }}>
                      Registro
                    </p>
                  </header>
                  <div className="p-3">
                    {Object.keys(errors).length > 0 && (
                      <div className="notification is-primary has-text-centered ">
                        Rellene todos los campos
                      </div>
                    )}
                  </div>
                  <div className="card-content">
                    <div className="is-row">
                      <div className="is columns m-2 p-2">
                        <div className=" is half">
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.document ? "is-primary" : ""
                              }`}
                              type="text"
                              name="document"
                              {...register("document", {
                                required: "Este campo es obligatorio",
                              })}
                              placeholder="Identificación"
                              value={document}
                              onChange={(e) => setDocument(e.target.value)}
                            />
                          </div>
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.name ? "is-primary" : ""
                              }`}
                              type="text"
                              {...register("name", {
                                required: "Este campo es obligatorio",
                              })}
                              name="name"
                              placeholder=" Primer nombre"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </div>
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.email ? "is-primary" : ""
                              }`}
                              type="text"
                              {...register("email", {
                                required: "Este campo es obligatorio",
                              })}
                              name="email"
                              placeholder="Correo"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className=" is half">
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.username ? "is-primary" : ""
                              }`}
                              type="text"
                              {...register("username", {
                                required: "Este campo es obligatorio",
                              })}
                              name="username"
                              placeholder="Usuario"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                            />
                          </div>
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.lastname ? "is-primary" : ""
                              }`}
                              type="text"
                              {...register("lastname", {
                                required: "Este campo es obligatorio",
                              })}
                              name="lastname"
                              placeholder="Apellidos"
                              value={lastname}
                              onChange={(e) => setLastname(e.target.value)}
                            />
                          </div>
                          <div className="p-2">
                            <input
                              className={`input ${
                                errors.phone ? "is-primary" : ""
                              }`}
                              type="text"
                              {...register("phone", {
                                required: "Este campo es obligatorio",
                              })}
                              name="phone"
                              placeholder="Telefono"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="is-row mb-2 ml-2 mr-2 pl-2 pr-2">
                        <div className="is-full m-2 mr-3">
                          <input
                            className={`input ${
                              errors.address ? "is-primary" : ""
                            }`}
                            type="text"
                            {...register("address", {
                              required: "Este campo es obligatorio",
                            })}
                            name="address"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                        <div className=" is columns p-2">
                          <div className="is column">
                            <div className="is-full">
                              <input
                                className={`input ${
                                  errors.password ? "is-primary" : ""
                                }`}
                                type="password"
                                {...register("password", {
                                  required: "Este campo es obligatorio",
                                })}
                                name="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="is column mr-1">
                            <div className="is-full ">
                              <input
                                className={`input ${
                                  errors.confirmPassword ? "is-primary" : ""
                                }`}
                                type="password"
                                {...register("confirmPassword", {
                                  required: "Este campo es obligatorio",
                                })}
                                name="confirmPassword"
                                placeholder="confirmar contraseña"
                                value={confirmPassword}
                                onChange={(e) => setconfirmPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="button is-primary" type="submit">
                    Registrar Usuario
                  </button>
                  <br />
                  <br />
                  <a href="/" style={{ color: "black" }}>
                    ¿Ya tienes una cuenta?
                  </a>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
