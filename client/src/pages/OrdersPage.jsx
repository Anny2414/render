import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Link } from "react-router-dom";

// CONEXION CON LA API DE USERS Y ROLES
import { getUser, getUsers } from "../api/users.api";
import { editOrder, getOrder, getOrders } from "../api/order.api";
import { Modal } from "../components/Modal.jsx";
import { getclients } from "../api/clients.api.js";
import { Notification } from "../components/Notification.jsx";

export function OrdersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);
  const [username, setUsername] = useState('');
  const [clientes , setClientes] = useState([])
  const [rol, setRol] = useState()
  const [notification, setNotification] = useState(null);


  //
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  // const rol = "Cliente"; 
  
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
      try {
        const resUser = await getUsers();
        const resclient = await getclients();
        const resOrder = await getOrders()
        setUsers(resUser.data);
        setClientes(resclient.data);
        setOrder(resOrder.data)
        setIsLoading(false); // Los datos han cargado, establece isLoading a false
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setIsLoading(false); // Si ocurre un error, también establece isLoading a false
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Verifica si los datos han cargado antes de utilizar la variable username
    if (!isLoading) {
      const name = localStorage.getItem("name");

      const user = users.find((user) => user.name === name);

      if (user) {
        setUsername(user.username);
        setRol(user.rol);
      } else {
        const client = clientes.find((client) => client.name === name);
        setUsername(client.username);
        setRol(client.rol);
      }
    }
  }, [users, clientes, isLoading]);
  


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
    setNotification({
      msg: "¿Seguro deseas cancelar este Pedido?",
      color: "warning",
      buttons: true,
      timeout: 0,
      onConfirm: async () => {
        try {
    
          const data = await getOrder(userId)
          data.status = "Cancelado"
          await editOrder(userId, data);
          reloadDataTable()
          setNotification({
            msg: "venta cancelada exitosamente!",
            color: "info",
            buttons: false,
            timeout: 3000,
          });
        } catch (error) {
          console.error("Error al editar el pedido: ", error);
        }
      },
    });
  };



  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
      <div className="notifications float">
          {notification && (
            <Notification
              msg={notification.msg}
              color={notification.color}
              buttons={notification.buttons}
              timeout={notification.timeout}
              onClose={() => setNotification(null)}
              onConfirm={notification.onConfirm}
            />
          )}
        </div>
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            {rol === "Administrador" ? (<Link to="/sale" className="button is-success is-fullwidth">Nuevo Pedido + </Link>) : (<Link to="/order" className="button is-success is-fullwidth">Nuevo Pedido + </Link>)}
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
            edit={true}
            delete={true}
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
            data={order.filter((item) => item.user === username)}
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