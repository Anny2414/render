import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Link } from "react-router-dom"; 

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { editOrder, getOrder, getOrders } from "../api/order.api";
import { Modal } from "../components/Modal.jsx";

export function OrdersPage() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  // const rol = "Cliente"; 
  const rol = "Administrador"; 
  const user = "Yei";

  const reloadDataTable = async () => {
    setOrder([])
    const res = await getOrders();
    setOrder(res.data)
  }
  const openModal = (title, fields, dataSelect, nameSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, buttonSubmit, submit });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const resUser = await getUsers();
      const res = await getOrders();
      setOrder(res.data);
      setUsers(resUser.data);
    }

    fetchData();
  }, []);




  const handleEditClick = async (SalesId) => {
    const res = await getOrder(SalesId);
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
        await editOrder(SalesId, data);
        reloadDataTable()
        closeModal()
      } catch (error) {
        console.error("Error al editar el pedido:", error);
      }
    };

    openModal("Editar venta", fieldsEdit, users, 'username', true, handleEditUser);
  };

  const handleDeleteClick = async (userId) => {
    try {
      const data = await getOrder(userId)
      data.status = "Cancelado" 
      await editOrder(userId, data);
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
            {rol === "Administrador" ? (<Link to ="/sale" className="button is-success is-fullwidth">Nuevo Pedido + </Link>) : (<Link to ="/order" className="button is-success is-fullwidth">Nuevo Pedido + </Link>)}
          </div>
          <div className="column is-9">
            <Input holder="Buscar usuario" icon="magnifying-glass" />
          </div>
          {rol === "Administrador" && (
            <div className="column is-fullwidth">
              <Button text="Generar PDF" color="primary" col="fullwidth" />
            </div>
          )}
        </div>
        
        {rol === "Administrador" ? (
          // Mostrar datos para el rol de Administrador
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
            edit = {true}
            delete = {true}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            data={order}
          />
        ) : (
          // Mostrar datos para otros roles
          <Table
            headers={["#", "create_at", "update_at", "total", "status"]}
            columns={["#", "Creado en", "Actualizado en", "Total", "Estado de venta"]}
            edit={false}
            delete={true}
            onDeleteClick={handleDeleteClick}
            data={order.filter((item) => item.user === user)}
          />
        )}
        
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