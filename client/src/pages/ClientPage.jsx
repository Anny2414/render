import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

import { Modal } from "../components/Modal.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  editUser,
  updateUserStatus,
} from "../api/clients.api.js";
import { getRoles } from "../api/roles.api";

export function ClientPage() {
  // ARREGLO DE USUARIOS Y ROLES
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const reloadDataTable = async () => {
    setUsers([])
    const res = await getUsers();
    setUsers(res.data)
  }

  const openModal = (title, fields, dataSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, buttonSubmit, submit });
    setIsOpen(true);
  };
  const handleStatusChange = async (userId, status) => {
    try {
      await updateUserStatus(userId, !status);
    } catch (error) {
      console.error(error);
    }
  };


  const closeModal = () => {
    setIsOpen(false);
  };

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Nombre",
      type: "text",
      name: "Name",
      icon: "user",
      col: "half",
      required: "true",
    },
    {
      title: "Apellido",
      type: "text",
      name: "Lastname",
      icon: "user",
      col: "half",
      required: "true",
    },
    {
      title: "Dirección",
      type: "text",
      name: "Adress",
      icon: "location-dot",
      col: "half",
      value: "yourburger123",
      readonly: "true",
    },
   
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getUsers();
      const resRoles = await getRoles();
      setUsers(res.data);
      setRoles(resRoles.data);
    }

    fetchData();
  }, []);

  const handleCreateUser = async (data) => {
    try {
      await createUser(data);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const handleEditClick = async (userId) => {
    const res = await getUser(userId);
    const user = res.data;

    const fieldsEdit = [
      {
        title: "Nombre",
        type: "text",
        name: "name",
        icon: "signature",
        col: "half",
        required: "true",
        value: user.name,
      },
      {
        title: "Apellido",
        type: "text",
        name: "lastname",
        icon: "signature",
        col: "half",
        required: "true",
        value: user.lastname,
      },
      {
        title: "Documento",
        type: "number",
        name: "document",
        icon: "id-card",
        col: "half",
        required: "true",
        value: user.document,
      },
      {
        title: "Dirección",
        type: "text",
        name: "address",
        icon: "location-dot",
        col: "half",
        required: "true",
        value: user.address,
      },
      {
        title: "Telefono",
        type: "number",
        name: "phone",
        icon: "phone",
        required: "true",
        value: user.phone,
        col: "full"
      },
    ];


    const handleEditUser = async (data) => {
      try {
        await editUser(userId, data);
        reloadDataTable()
        closeModal()
      } catch (error) {
        console.error("Error al editar el usuario:", error);
      }
    };


    openModal("Editar cliente", fieldsEdit, null, true, handleEditUser);
  };

  const handleDeleteClick = async(userId) => {
    await deleteUser(userId);
    reloadDataTable()
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear Cliente +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal("Nuevo Cliente", fieldsNew, roles, handleCreateUser)
              }
            />
          </div>
          <div className="column is-9">
            <Input holder="Buscar usuario" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        <Table
          headers={["document", "name", "lastname", "address", "phone"]}
          columns={["Documento", "Nombre", "Apellido", "Direccion", "Telefono"]}
          data={users}
          status
          edit
          delete
          onStatusClick={handleStatusChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
      {isOpen && (
        <Modal
          title={modalConfig.title}
          fields={modalConfig.fields}
          dataSelect={modalConfig.dataSelect}
          onClose={closeModal}
          buttonSubmit={modalConfig.buttonSubmit}
          submit={modalConfig.submit}
        />
      )}

    </div>
  );
}
