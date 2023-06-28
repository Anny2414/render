import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Link } from "react-router-dom"; 

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { createOrder, deleteOrder, editOrder, getOrder, getOrders } from "../api/order.api";
import { Modal } from "../components/Modal.jsx";

export function OrdersPage() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  const rol = "Admiistrador"; // Corrected role value
  const user = "Yei";

  const reloadDataTable = async () => {
    setUsers([])
    const res = await getUsers();
    setUsers(res.data)
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
      title: "Total",
      type: "text",
      name: "total",
      icon: "dollar",
      required: "true",
    },
    {
      title: "Usuario",
      type: "select",
      name: "user",
      icon: "user",
      col: "half",
      keySelect: "username",
      data: users,
    },
  ];

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

  const handleCreateOrder = async (data) => {
    try {
      await createOrder(data);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear la venta:", error);
    }
  };

  const handleEditClick = async (OrderId) => {
    const res = await getOrder(OrderId);
    const order = res.data;
    const customOptions = [
      { "id": 1,"status": "Por pagar" },
      { "id": 2,"status": "Pago" },
      { "id": 3,"status": "Cancelado" },
    ];
    console.log(customOptions[0]['status']);
    console.log(users);
    const fieldsEdit = [
      {
        title: "Total",
        type: "text",
        name: "total",
        icon: "dollar",
        col: "half",
        required: "true",
        value: order.total,

      },
      {
        title: "Usuario",
        type: "select",
        name: "user",
        icon: "user",
        col: "half",
        keySelect: "username",
        value: order.user,
      },
      {
        title: "Estado",
        type: "select",
        name: "status",
        col: "full",
        icon: "lock-open",
        keySelect: "status",
        nameSelect: "status",
        value: order.status,
        customOptions: customOptions
      },

    ];

    const handleEditUser = async (data) => {
      try {
        await editOrder(OrderId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar la venta:", error);
      }
    };

    openModal("Editar venta", fieldsEdit, users, 'username', true, handleEditUser);
  };

  const handleDeleteClick = async (userId) => {
    await deleteOrder(userId);
    reloadDataTable()
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
            edit
            delete
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
            data={order}
          />
        ) : (
          // Mostrar datos para otros roles
          <Table
            headers={["id", "create_at", "update_at", "total", "status"]}
            columns={["ID", "Creado en", "Actualizado en", "Total", "Estado de venta"]}
            edit={false}
            delete={handleDeleteClick}
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