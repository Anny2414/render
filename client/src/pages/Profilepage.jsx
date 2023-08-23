import React, { useState, useEffect } from "react";
import { Carga } from "../components/Carga";
import CryptoJS from "crypto-js";
import user from "../assets/img/user.png";
import { getUser as getClientUser, editUser as editClientUser } from "../api/clients.api";
import { Navbar } from "../components/Navbar";
import { Input } from "../components/Form/Input";
import { Button } from "../components/Form/Button";
import { getUser, editUser } from "../api/users.api";
import "../assets/css/LoginForm.css";

export function Profile() {
  const [mostrarCarga, setMostrarCarga] = useState(false);
  const [camposHabilitados, setCamposHabilitados] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [datosProvenientesDeClientsAPI, setDatosProvenientesDeClientsAPI] = useState(false); // Cambié el nombre de la variable
  
  const mostrarPantallaDeCarga = () => {
    setMostrarCarga(true);
    setTimeout(() => {
      setMostrarCarga(false);
    }, 2000); // Cambia 2000 por el tiempo que quieras mostrar la carga (en milisegundos)
  };
  const encryptionKey = "Yourburger";
  const encryptedUserData = localStorage.getItem("Token");
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedUserData, encryptionKey);
  const decryptedUserDataJSON = decryptedBytes.toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(decryptedUserDataJSON);
  const userId = userData.token.user_id;

  // Estado para los datos del perfil
  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    email: "",
    phone: "",
    address: "", // Cambiado de "direccion" a "address"
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First, try to fetch user data from userapi
        const userApiResponse = await getUser(userId);

        // If user data is found in userapi, update the state
        setProfileData({
          name: userApiResponse.data.name,
          lastname: userApiResponse.data.lastname,
          email: userApiResponse.data.email,
          phone: userApiResponse.data.phone,
          address: userApiResponse.data.address,
        });
        return;
      } catch (error) {
        console.error("Error al obtener datos del perfil desde userapi:", error);
      }

      // If user data is not found in userapi, fetch it from clients api
      try {
        const clientUserResponse = await getClientUser(userId);
        const clientUserData = clientUserResponse.data;

        // Update the state with data from clients api
        setProfileData({
          name: clientUserData.name,
          lastname: clientUserData.lastname,
          email: clientUserData.email,
          phone: clientUserData.phone,
          address: clientUserData.address,
        });
        setDatosProvenientesDeClientsAPI(true);
      } catch (error) {
        console.error("Error al obtener datos del perfil desde clients api:", error);
      }
    };

    fetchData();
  }, [userId]);

  const habilitarCampos = () => {
    setCamposHabilitados(true);
    setModoEdicion(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const guardarCambios = async () => {
    try {
      // Enviar los datos actualizados al servidor
      mostrarPantallaDeCarga();
  
      // Utiliza editClientUser si los datos provienen de clients api, de lo contrario, utiliza editUser
      if (datosProvenientesDeClientsAPI) {
        await editClientUser(userId, profileData);
      } else {
        await editUser(userId, profileData);
      }
  
      console.log("Cambios guardados exitosamente.");
      setCamposHabilitados(false);
  
      // Esperar un momento antes de recargar la página
      setTimeout(() => {
        window.location.reload(); // Cambié location.reload() a window.location.reload()
      }, 1000); // Cambia 1000 por el tiempo que desees en milisegundos
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
      // Puedes mostrar una notificación o mensaje de error aquí
    }
  };

  const handleButtonClick = () => {
    if (modoEdicion) {
      // Estamos en modo "Guardar", llama a la función para guardar cambios
      guardarCambios();
    } else {
      // Estamos en modo "Editar", habilita los campos para la edición
      habilitarCampos();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="hero-body has-text-centered  z ">
        {mostrarCarga ? (
          <Carga />
        ) : (
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
                    <h5>{localStorage.getItem("username")}</h5>
                  </div>
                </div>
              </div>
              <div className="is-flex is-justify-content-center m-3">
                <div className="m-2">
                  <Button
                    text={modoEdicion ? "Guardar" : "Editar"}
                    color="primary"
                    action={handleButtonClick}
                  />
                </div>
                <div className="m-2">
                  <Button text="Cambiar Clave" color="primary" action="submit" />
                </div>
              </div>
            </div>
            <div className="m-4">
              <div className="column is-full x">
                <div className="columns">
                  <div className="column">
                    <div className="mt-5 ml-5">
                      <Input
                        value={profileData.name}
                        icon="user"
                        type="text"
                        name="name"
                        error={false}
                        disabled={!camposHabilitados}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mt-5 ml-5">
                      <Input
                        value={profileData.email}
                        icon="user"
                        type="text"
                        name="email"
                        error={false}
                        disabled={!camposHabilitados}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="column">
                    <div className="mt-5 mr-5">
                      <Input
                        value={profileData.lastname}
                        icon="user"
                        type="text"
                        name="lastname"
                        error={false}
                        disabled={!camposHabilitados}
                        onChange={handleInputChange}
                      />
                      <div className="mt-5 ">
                        <Input
                          value={profileData.phone}
                          icon="user"
                          type="text"
                          name="phone"
                          error={false}
                          disabled={!camposHabilitados}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="is-row mb-5 ml-2 mr-2 pl-2 pr-1">
                  <div className="is-full m-2 mr-3">
                    <Input
                      value={profileData.address}
                      icon="user"
                      type="text"
                      name="address"
                      error={false}
                      disabled={!camposHabilitados}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
