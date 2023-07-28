import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/only-text.png";
import { getclients } from "../api/clients.api"
import { getUsers } from "../api/users.api"
import { getPermissions } from "../api/permissions.api"

export function Navbar() {
  const [username, setUsername] = useState('');
  const [rol, setRol] = useState();
  const [permisos, setPermisos] = useState();

  useEffect(() => {
    const name = localStorage.getItem('name');
    const api = async () => {
      try {
        const resUser = await getUsers();
        const user = resUser.data.filter((user) => user.name === name);
    
        if (user.length > 0) { // Check if the 'user' array has any elements
          console.log(user);
          setUsername(name);
          setRol(user[0].role);
          const resPermiso = await getPermissions(user[0].role);
          setPermisos(resPermiso);
        } else {
          const resClient = await getclients();
          const client = resClient.data.filter((client) => client.name === name);
    
          if (client.length > 0) { // Check if the 'client' array has any elements
            setUsername(name);
            setRol(client[0].role);
            const resPermiso = await getPermissions(client[0].role);
            setPermisos(resPermiso);
          } else {
            window.location.replace("/login");
          }
        }
      } catch (error) {
        // Handle any errors that occur during the API calls
        console.error("Error:", error);
        // Optionally, you might want to redirect to an error page or display an error message.
      }
    };
    api()
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
          <Link to="/home">
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
          {console.log(permisos)}
          {permisos ? (
            permisos.map((obj) => {
              if (obj === "Usuarios") {
                return (
                  <Link to="/users" className="navbar-item" key="Usuarios">
                    Usuarios
                  </Link>
                );
              } else if (obj === "Clientes") {
                return (
                  <Link to="/clients" className="navbar-item" key="Clientes">
                    Clientes
                  </Link>
                );
              } else if (obj === "Productos") {
                return (
                  <Link to="/products" className="navbar-item" key="Productos">
                    Productos
                  </Link>
                );
              } else if (obj === "Ingredientes") {
                return (
                  <Link to="/supplies" className="navbar-item" key="Ingredientes">
                    Ingredientes
                  </Link>
                );
              } else if (obj === "Pedidos") {
                return (
                  <Link to="/order" className="navbar-item" key="Pedido">
                    Pedidos
                  </Link>
                );
              } else if (obj === "Roles") {
                return (
                  <Link to="/roles" className="navbar-item" key="Roles">
                    Roles
                  </Link>
                );
              } else if (obj === "Ventas") {
                return (
                  <Link to="/sales" className="navbar-item" key="Ventas">
                    Ventas
                  </Link>
                );
              }
              return null; // Return null for cases where obj does not match any condition
            })
          ) : (
            console.log("no")
          )}

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
