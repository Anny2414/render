import React, { useState, useEffect } from "react";
import axios from "axios";

const RegisterForm = () => {

  // Estado para almacenar los valores de los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [document, setDocument] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/yourburger/api/v1/roles/");
      setRoles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

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
      role: "Cliente" // Asignar el valor por defecto del rol
    };
  try {
    // Enviar los datos del registro al servidor
    const response = await axios.post("http://127.0.0.1:8000/yourburger/register/", userData);
    console.log(response.data); 
    setUsername("");
      setEmail("");
      setPassword("");
      setDocument("");
      setName("");
      setLastname("");
      setAddress("");
      setPhone("");// Manejar la respuesta del servidor según sea necesario

    // Restablecer los campos del formulario
    // ...

    // Redirigir a la página de inicio de sesión
    window.location.href = "/login"; // Reemplaza "/login" con la URL correcta de tu vista de inicio de sesión
  } catch (error) {
    console.error(error);
  }
};
  return (
<section className="hero is-fullheight">
  <form className="form-registro"onSubmit={handleRegister}>
    <div className="notifications" />
    <div className="hero-body has-text-centered">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half has-background-white">
            <div className="card">
              <header className="card-header">
                <br />
              </header>
              <div className="card-content px-6">
                <div className="content">
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Nombre de usuario</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fas fa-user" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Correo</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fas fa-envelope" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Contraseña</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="password" placeholder name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fas fa-key" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Documento</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Documento"value={document} onChange={(e) => setDocument(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fa-solid fa-id-card-clip" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Nombre</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Nombre"value={name} onChange={(e) => setName(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fa-solid fa-signature"/>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Apellidos</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Apellidos"value={lastname} onChange={(e) => setLastname(e.target.value)} />
                          <span className="icon is-small is-left">
                          <i className="fa-solid fa-signature"/>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Dirección</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
                          <span className="icon is-small is-left">
                            <i className="fa-solid fa-location-dot" />
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">Telefono</label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <p className="control has-icons-left">
                          <input className="input" type="text" placeholder name="Telefono" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          <span className="icon is-small is-left">
                          <i class="fa-solid fa-phone"/>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <button className="button is-primary" href="login.html" type="submit">Registrar
                    Usuario</button>
                  <br />
                  <br />
                  <a href="login.html">¿Ya tienes una cuenta?</a>
                </div>
              </div>
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

