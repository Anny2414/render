import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { createSale, deleteSale, editSale, getSale, getSales } from "../api/sales.api.js";
import { Modal } from "../components/Modal.jsx";
import { Link } from "react-router-dom";

export function SalesPage() {
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();



  const reloadDataTable = async () => {
    setSales([])
    const res = await getSales();
    setSales(res.data)
  }

  const openModal = (title, fields, dataSelect, nameSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, buttonSubmit, submit });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };



  // Objeto para los campos de la ventana modal
  // const fieldsNew = [
  //   {
  //     title: "Total",
  //     type: "text",
  //     name: "total",
  //     icon: "dollar",
  //     required: "true",
  //   },
  //   {
  //     title: "Usuario",
  //     type: "select",
  //     name: "user",
  //     icon: "user",
  //     col: "half",
  //     keySelect: "username",
  //     data: users,
  //   },
  //   {
  //     title: "Estado",
  //     type: "text",
  //     name: "status",
  //     icon: "user",
  //     col: "half",
  //     value : "Por pagar",
  //     readonly : true
  //   },
  // ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const resUser = await getUsers();
      const res = await getSales();
      setSales(res.data);
      setUsers(resUser.data);
    }

    fetchData();
  }, []);

  const handleCreateSales = async (data) => {
    try {
      await createSale(data);
      reloadDataTable()
      closeModal()
    } catch (error) {
      console.error("Error al crear la venta:", error);
    }
  };

  const handleEditClick = async (SalesId) => {
    const res = await getSale(SalesId);
    const sales = res.data;
    const customOptions = [
      { "id": 1, "status": "Por pagar" },
      { "id": 2, "status": "Pago" },
      { "id": 3, "status": "Cancelado" },
    ];
    const fieldsEdit = [
      {
        title: "Estado",
        type: "select",
        name: "status",
        col: "full",
        icon: "lock-open",
        keySelect: "status",
        nameSelect: "status",
        value: sales.status,
        customOptions: customOptions
      },

    ];

    const handleEditUser = async (data) => {
      try {
        await editSale(SalesId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar la venta:", error);
      }
    };

    openModal("Editar venta", fieldsEdit, users, 'username', true, handleEditUser);
  };


  const handleDeleteClick = async (userId) => {
    try {
      const data = await getSale(userId)
      data.status = "Cancelado"
      await editSale(userId, data);
      reloadDataTable()
    } catch (error) {
      console.error("Error al editar el pedido: ", error);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Link to="/sale" className="button is-success is-fullwidth">Crear Venta +</Link>
          </div>
          <div className="column is-9">
            <Input holder="Buscar usuario" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        {console.log(sales)}
        <Table
          headers={["id", "user", "create_at", "update_at", "total", "status"]}
          columns={[
            "ID",
            "Usuario",
            "Creado en",
            "Actualizado en",
            "Total",
            "Estado de venta",
          ]}
          edit
          delete
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          data={[{
            create_at: "2023-06-28",
            id:16,
            status:"Cancelado",
            total:24,
            update_at:"2023-06-29",
            user:"Yei"
          }]}
        />
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
    </div>
  );
}
