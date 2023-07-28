import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/only-text.png";
import {getclients} from "../api/clients.api"
import {getUsers} from "../api/users.api"
import {getPermissions} from "../api/permissions.api"

export function Navbar() {
  const [username, setUsername] = useState('');
  const [rol, setRol] = useState('');
  const [permiso, setPermiso] = useState('');
  
  useEffect(() => {
    const name = localStorage.getItem('name');
    const api = async () =>{
      const resUser = await getUsers()

      const user = resUser.data.filter((user) => user.name == name)
      
      if (user) {
        setUsername(user.username);
        setRol(user.role)
        const resPermiso  = await getPermissions(user.role)
        setPermiso(resPermiso.data)
      }else{
        const resClient = await getclients()
        const client = resClient.data.filter((client) => client.name ==  name)

        if (client) {
          setUsername(client.username);
          setRol(client.role)
          const resPermiso  = await getPermissions(client.role)
        } else {
          window.location.replace("/login")
        }
      }

    }
  }, []);

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="navbar-item">
          <Link to="/">
            <img src={Logo} width="110" />
          </Link>
        </div>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={toggleMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className={`navbar-menu ${isMenuOpen ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Link to="/users" className="navbar-item">
            Usuarios
          </Link>

          <Link to="/clients" className="navbar-item">
            Clientes
          </Link>

          <Link to="/products" className="navbar-item">
            Productos
          </Link>

          <Link to="/supplies" className="navbar-item">
            Ingredientes
          </Link>

          <Link to="/order" className="navbar-item">
            Pedidos
          </Link>

          <Link to="/roles" className="navbar-item">
            Roles
          </Link>

          <Link to="/sales" className="navbar-item">
            Ventas
          </Link>
        </div>

        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">{username}</a>

            <div className="navbar-dropdown">
              <Link to="/" className="navbar-item" onClick={cerrarSesion}>
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
