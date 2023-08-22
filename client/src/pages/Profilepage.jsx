import { Navbar } from "../components/Navbar";
import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import React, { useState, useEffect } from "react";
import user from "../assets/img/user.png";
import "../assets/css/LoginForm.css";
import {
  getUser,
  editUser,
  updateUserStatus,
} from "../api/users.api";

export function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [camposHabilitados, setCamposHabilitados] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Profiles();
        setProfileData(data);
      } catch (error) {
        console.error('Error al obtener datos del perfil:', error);
      }
    };

    fetchData();
  }, []);

  const habilitarCampos = () => {
    setCamposHabilitados(true);
  };



  return (
    <div>
      <Navbar />
      <div className="hero-body has-text-centered  z ">
        <div className="columns y ">
          <div className="column is-two-fifths v ">
            <div className="mr-3 mt-2 ml-1">
              <div className="foto ">
                <img
                  className="imagensita "
                  src={user}
                  alt="Logo"
                  width="30%"
                />
                <div className="mb-3 mt-2">
                  <h5></h5>
                </div>
              </div>
            </div>
            <div className="is-flex is-justify-content-center m-3">
              <div className="m-2">
                <Button text="Editar" color="primary" action={habilitarCampos} />
              </div>
              <div className="m-2">
                <Button text="cambiar Clave" color="primary" action="submit" />
              </div>
            </div>
          </div>
          <div className="m-4">
            <div className="column is-full x">
              <div className="columns">
                <div className="column">
                  <div className="mt-5 ml-5">
                    <Input
                      holder="Ingresa tu nombre"
                      icon="user"
                      type="text"
                      value={""}
                      name="nombre"
                      error={false}
                      disabled={!camposHabilitados} // Usa camposHabilitados para habilitar/deshabilitar el input
                    />
                  </div>
                  <div className="mt-5 ml-5">
                    <Input
                      holder="Ingresa tu nombre"
                      icon="user"
                      type="text"
                      value={"Ana"}

                      name="nombre"
                      error={false} // Cambia a true para ver el estilo de error
                      style="my-custom-input" // Clase de estilo personalizada, si es necesario
                      disabled={!camposHabilitados} // Cambia a true para deshabilitar el input
                    />
                  </div>
                </div>
                <div className="column">
                  <div className="mt-5 mr-5">
                    <Input
                      holder="Ingresa tu nombre"
                      icon="user"
                      type="text"
                      value={"Ana"}

                      name="nombre"
                      error={false} // Cambia a true para ver el estilo de error
                      style="my-custom-input" // Clase de estilo personalizada, si es necesario
                      disabled={!camposHabilitados} // Cambia a true para deshabilitar el input
                    />
                  </div>
                  <div className="mt-5 mr-5">
                    <Input
                      holder="Ingresa tu nombre"
                      icon="user"
                      type="text"
                      value={"Ana"}
                      name="nombre"
                      error={false} // Cambia a true para ver el estilo de error
                      style="my-custom-input" // Clase de estilo personalizada, si es necesario
                      disabled={!camposHabilitados}// Cambia a true para deshabilitar el input
                    />
                  </div>
                </div>
              </div>
              <div className="is-row mb-2 ml-2 mr-2 pl-2 pr-1">
                <div className="is-full m-2 mr-3">
                  <Input
                    holder="Ingresa tu nombre"
                    icon="user"
                    type="text"
                    value={"Ana"}
                    name="nombre"
                    error={false} // Cambia a true para ver el estilo de error
                    style="my-custom-input" // Clase de estilo personalizada, si es necesario
                    disabled={!camposHabilitados} // Cambia a true para deshabilitar el input
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
