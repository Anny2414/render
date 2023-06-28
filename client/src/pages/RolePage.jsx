import { React, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

import { Modal } from "../components/Modal.jsx";

// CONEXION CON LA API DE ROLES
import {
  savePermissions,
  checkPermission,
  deletePermissionsByRole,
} from "../api/permissions.api";

import {
  getRoles,
  createRole,
  deleteRole,
  getRole,
  editRole,
  updateRoleStatus,
} from "../api/roles.api";

export function RolePage() {
  const [roles, setRoles] = useState([]);

  // CONFIGURACION MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const openModal = (
    title,
    fields,
    dataSelect,
    nameSelect,
    buttonSubmit,
    submit
  ) => {
    setModalConfig({
      title,
      fields,
      dataSelect,
      nameSelect,
      buttonSubmit,
      submit,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const reloadDataTable = async () => {
    setRoles([]);
    const res = await getRoles();
    setRoles(res.data);
  };

  const fieldsNew = [
    {
      title: "Nombre",
      type: "text",
      name: "name",
      icon: "user",
      col: "full",
      disabled: false,
      required: true,
    },
    { title: "Usuarios", type: "checkbox", col: "4", required: "false" },
    { title: "Clientes", type: "checkbox", col: "4", required: "false" },
    { title: "Productos", type: "checkbox", col: "4", required: "false" },
    { title: "Pedidos", type: "checkbox", col: "4", required: "false" },
    { title: "Roles", type: "checkbox", col: "4", required: "false" },
    { title: "Ventas", type: "checkbox", col: "4", required: "false" },
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
      const res = await createRole({ name: data.name });
      const roleId = res.data.id; // Obtener el ID del rol creado

      const selectedModules = Object.entries(data)
        .filter(([module, value]) => value && module !== "name")
        .map(([module]) => module);

      for (const module of selectedModules) {
        try {
          await savePermissions(roleId, module);
        } catch (error) {
          console.error(
            `Error al crear permiso para el modulo ${module} y el rol ${roleId}: `,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error al crear el rol:", error);
    }

    reloadDataTable();
    closeModal();
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
      {
        title: "Usuarios",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Usuarios"),
      },
      {
        title: "Clientes",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Clientes"),
      },
      {
        title: "Productos",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Productos"),
      },
      {
        title: "Pedidos",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Pedidos"),
      },
      {
        title: "Roles",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Roles"),
      },
      {
        title: "Ventas",
        type: "checkbox",
        name: "role",
        col: "4",
        checked: await checkPermission(role.id, "Ventas"),
      },
    ];

    const handleEditRole = async (data) => {
      const { name } = data;

      try {
        await editRole(roleId, { name: name });
      } catch (error) {
        console.error("Error al editar el rol:", error);
      }

      try {
        await deletePermissionsByRole(roleId);
      } catch (error) {
        console.error("Error al eliminar los permisos del rol:", error);
      }

      const selectedModules = Object.entries(data)
        .filter(([module, value]) => value && module !== "name")
        .map(([module]) => module);

      for (const module of selectedModules) {
        try {
          await savePermissions(roleId, module);
        } catch (error) {
          console.error(
            `Error al crear permiso para el modulo ${module} y el rol ${roleId}: `,
            error
          );
        }
      }

      reloadDataTable();
      closeModal();
    };

    openModal("Editar rol", fieldsEdit, null, null, true, handleEditRole);
  };

  const handleStatusChange = async (roleId, status) => {
    try {
      await updateRoleStatus(roleId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (roleId) => {
    await deleteRole(roleId);
    await deletePermissionsByRole(roleId);
    reloadDataTable();
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear Rol +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal(
                  "Nuevo rol",
                  fieldsNew,
                  null,
                  null,
                  true,
                  handleCreateRole
                )
              }
            />
          </div>
          <div className="column is-10">
            <Input holder="Buscar rol" icon="magnifying-glass" />
          </div>
        </div>
        <Table
          headers={["#", "name", "created_at", "permissions"]}
          columns={["#", "Nombre", "Creado en", "Permisos"]}
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
