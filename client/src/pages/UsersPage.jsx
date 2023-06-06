import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

import { Modal } from "../components/Modal.jsx";

import { Notification } from "../components/Notification.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  editUser,
  updateUserStatus,
} from "../api/users.api";

import { getRoles } from "../api/roles.api";

export function UsersPage() {
  // ARREGLO DE USUARIOS Y ROLES
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  // CONFIGURACION MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const reloadDataTable = async () => {
    await setUsers([])
    const res = await getUsers();
    await setUsers(res.data)
  }

  const openModal = (title, fields, dataSelect, nameSelect, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, submit });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Usuario",
      type: "text",
      name: "username",
      icon: "user",
      col: "half",
      required: "true",
    },
    {
      title: "Email",
      type: "text",
      name: "email",
      icon: "envelope",
      col: "half",
      required: "true",
    },
    {
      title: "Contraseña",
      type: "password",
      name: "password",
      icon: "key",
      col: "half",
      value: "yourburger123",
      readonly: "true",
    },
    {
      title: "Rol",
      type: "select",
      name: "role",
      icon: "lock-open",
      col: "half",
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
      reloadDataTable()
      closeModal()
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const handleEditClick = async (userId) => {
    const res = await getUser(userId);
    const user = res.data;

    const fieldsEdit = [
      {
        title: "Usuario",
        type: "text",
        name: "username",
        icon: "user",
        col: "half",
        required: "true",
        value: user.username,
      },
      {
        title: "Email",
        type: "text",
        name: "email",
        icon: "envelope",
        col: "half",
        required: "true",
        value: user.email,
      },
      {
        title: "Rol",
        type: "select",
        name: "role",
        col: "full",
        icon: "lock-open",
        value: user.role,
      },
    ];

    const handleEditUser = async (data) => {
      try {
        await editUser(userId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar el usuario:", error);
      }
    };

    openModal("Editar usuario", fieldsEdit, roles, "name", handleEditUser);
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await updateUserStatus(userId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (userId) => {
    deleteUser(userId);
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear usuario +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal(
                  "Nuevo usuario",
                  fieldsNew,
                  roles,
                  "name",
                  handleCreateUser
                )
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
          headers={["id", "role", "username", "email", "date"]}
          columns={["ID", "Rol", "Usuario", "Correo", "Creado en"]}
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
          nameSelect={modalConfig.nameSelect}
          onClose={closeModal}
          submit={modalConfig.submit}
        />
      )}
    </div>
  );
}
