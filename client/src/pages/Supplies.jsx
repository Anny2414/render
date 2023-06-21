import { useEffect, useState } from "react";

import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

import { Modal } from "../components/Modal.jsx";

import { Notification } from "../components/Notification.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import {
  getSupplies,
  createSupplie,
  deleteSupplie,
  getSupplie,
  editSupplie,
  updateSupplieStatus,
} from "../api/supplies.api.js";


export function SuppliesPage() {
  // ARREGLO DE USUARIOS Y ROLES
  const [Supplies, setSupplies] = useState([]);

  // CONFIGURACION MODAL
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const reloadDataTable = async () => {
    setSupplies([])
    const res = await getSupplies();
    setSupplies(res.data)
  }

  const openModal = (title, fields, dataSelect, nameSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, buttonSubmit, submit });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Nombre",
      type: "text",
      name: "name",
      icon: "burger",
      col: "half",
      required: "true",
    },
    {
      title: "Costo Adicional",
      type: "number",
      name: "price",
      icon: "dollar",
      col: "half",
      required: "true",
    },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getSupplies();
      setSupplies(res.data);
    }

    fetchData();
  }, []);

  const handleCreateSupplie = async (data) => {
    try {
      await createSupplie(data);
      reloadDataTable()
      closeModal()
    } catch (error) {
      console.error("Error al crear el Ingrediente:", error);
    }
  };

  const handleEditClick = async (supplieId) => {
    const res = await getSupplie(supplieId);
    const supplie = res.data;

    const fieldsEdit = [
      {
        title: "Nombre",
        type: "text",
        name: "name",
        icon: "burger",
        col: "half",
        required: "true",
        value: supplie.name,
      },
      {
        title: "Costo Adicional",
        type: "number",
        name: "price",
        icon: "dollar",
        col: "half",
        required: "true",
        value: supplie.price,
      },

    ];

    const handleEditSupplie = async (data) => {
      try {
        await editSupplie(supplieId, data);
        reloadDataTable()
        closeModal()
      } catch (error) {
        console.error("Error al editar el Ingrediente:", error);
      }
    };

    openModal("Editar Ingrediente", fieldsEdit, Supplies, "status", true, handleEditSupplie);
  };

  const handleStatusChange = async (supplieId, status) => {
    try {
      await updateSupplieStatus(supplieId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async(supplieId) => {
    await deleteSupplie(supplieId);
    reloadDataTable()
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear Ingrediente +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal(
                  "Nuevo Ingrediente",
                  fieldsNew,
                  null,
                  null,
                  true,
                  handleCreateSupplie
                )
              }
            />
          </div>
          <div className="column is-9">
            <Input holder="Buscar Ingrediente" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        <Table
          headers={["id", "name", "price"]}
          columns={["ID", "Nombre", "Costo Adicional"]}
          data={Supplies}
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
          buttonSubmit={modalConfig.buttonSubmit}
          onClose={closeModal}
          submit={modalConfig.submit}
        />
      )}
    </div>
  );
}
