import { React, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

import { Modal } from "../components/Modal.jsx";

// CONEXION CON LA API DE ROLES
import { getRoles, createRole, deleteRole, getRole, editRole, updateRoleStatus } from "../api/roles.api";

export function RolePage() {
  const [roles, setRoles] = useState([]);

  // CONFIGURACION MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const openModal = (title, fields, dataSelect, nameSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, buttonSubmit, submit });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fieldsNew = [
    {
      title: "Nombre",
      type: "text",
      name: "name",
      icon: "user",
      col: "full",
      disabled: "false",
      required: "true",
    },
    { title: "Usuarios", type: "checkbox", name: "role", col: "4", required: "false" },
    { title: "Clientes", type: "checkbox", name: "role", col: "4", required: "false" },
    { title: "Productos", type: "checkbox", name: "role", col: "4", required: "false" },
    { title: "Pedidos", type: "checkbox", name: "role", col: "4", required: "false" },
    { title: "Roles", type: "checkbox", name: "role", col: "4", required: "false" },
    { title: "Ventas", type: "checkbox", name: "role", col: "4", required: "false" },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await getRoles();
      setRoles(res.data);
    }

    fetchData();
  }, []);

  const handleCreateRole = async (data) => {
    try {
      // await createRole(data);
      console.log(data);
    } catch (error) {
      console.error("Error al crear el rol:", error);
    }
  };

  const handleEditClick = async (roleId) => {
    const res = await getRole(roleId);
    const role = res.data;

    const fieldsEdit = [
      {
        title: "Nombre",
        type: "text",
        name: "name",
        icon: "user",
        col: "full",
        value: role.name,
        disabled: "false",
      },
      { title: "Usuarios", type: "checkbox", name: "role", col: "4" },
      { title: "Clientes", type: "checkbox", name: "role", col: "4" },
      { title: "Productos", type: "checkbox", name: "role", col: "4" },
      { title: "Pedidos", type: "checkbox", name: "role", col: "4" },
      { title: "Roles", type: "checkbox", name: "role", col: "4" },
      { title: "Ventas", type: "checkbox", name: "role", col: "4" },
    ];

    const handleEditRole = async (data) => {
      try {
        await editRole(roleId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar el usuario:", error);
      }
    };

    openModal("Editar usuario", fieldsEdit, null, null, true, handleEditRole);
  }

  const handleStatusChange = async (roleId, status) => {
    try {
      await updateRoleStatus(roleId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (roleId) => {
    deleteRole(roleId);
    window.location.reload();
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button text="Crear rol +" color="success" col="fullwidth" action={() => openModal("Nuevo rol", fieldsNew, null, null, true, handleCreateRole)} />
          </div>
          <div className="column is-10">
            <Input holder="Buscar rol" icon="magnifying-glass" />
          </div>
        </div>
        <Table
          headers={["id", "name", "created_at"]}
          columns={["ID", "Nombre", "Creado en"]}
          data={roles}
          edit
          status
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
          buttonSubmit={modalConfig.buttonSubmit}
          onClose={closeModal}
          submit={modalConfig.submit}
        />
      )}
    </div>
  );
}
