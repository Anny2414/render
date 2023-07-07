import React, { useState } from 'react';
import Logo from "../assets/img/Logo.png";
import '../assets/css/LoginForm.css';
import { Login } from '../api/login.api'; // Importa la función de inicio de sesión
const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await Login(username, password);
      location.replace('/home');
      
      // Realiza acciones adicionales después de iniciar sesión exitosamente
    } catch (error) {
      // Maneja el error de inicio de sesión
    }
  };

  return (
<form className="form-login">
  <div className="notifications" />
  <div className="hero-body has-text-centered">
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half has-background-white">
          <div className="card">
            <header className="card-header">
              <div className="media">
              <img src={Logo} alt="Logo" width="230px" />
              </div>
            </header>
            <div className="card-content px-6">
              <div className="content">
                <div className="field is-vertical">
                  <div className="field-label">
                    <label className="label has-text-centered">Usuario</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <p className="control has-icons-left">
                        <input className="input" type="text" name="username"  value={username} onChange={e => setUsername(e.target.value)} />
                        <span className="icon is-small is-left">
                          <i className="fa-solid fa-user-tie" />
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
                        <input className="input" type="password" name="password"value={password} onChange={e => setPassword(e.target.value)} />
                        <span className="icon is-small is-left">
                          <i className="fas fa-key" />
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <button className="button is-primary" href="/" type="submit" onClick={handleLogin}>Iniciar sesión</button>
                <br />
                <br />
                <a className="is-link contra" type="button" name="recuperar">¿Olvidaste tu
                  contraseña?</a>
                <br />
                <br />
                <a className="is-link contra" href="/registro">¿Aún no tienes una cuenta?</a>
                <br /><br />
              </div>
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
