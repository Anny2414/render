import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { createOrder, deleteOrder, editOrder, getOrder , getOrders } from "../api/order.api";
import { Modal } from "../components/Modal.jsx";

export function SalesPage() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

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
      col: "half" 
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

    const fieldsEdit = [
      {
        title: "Total",
        type: "text",
        name: "total",
        icon: "dollar",
        col: "half",
        required: "true",
        value: order.total
      },
      { title: "Usuario", type: "select", name: "user", icon: "user",value : order.user },
    ];

    const handleEditUser = async (data) => {
      try {
        await editOrder(OrderId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar la venta:", error);
      }
    };

    openModal("Editar venta", fieldsEdit, users,'username' ,  handleEditUser);
  };

  const handleDeleteClick = (userId) => {
    deleteOrder(userId);
    window.location.reload();
  };



  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear Venta +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal("Nueva venta", fieldsNew, users, 'username', handleCreateOrder)
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
          headers={["id", "user", "create_at", "update_at", "total", "statu"]}
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
    </div>
  );
}
