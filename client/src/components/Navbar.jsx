import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/img/only-text.png";

export function Navbar() {
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

          <Link to="/orders" className="navbar-item">
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
            <a className="navbar-link">Yeiner Naranjo</a>

            <div className="navbar-dropdown">
              <Link to="/home" className="navbar-item">
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
