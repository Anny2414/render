import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";
import { BaseModal } from "../components/BaseModal.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { getOrder } from "../api/order.api";

export function SalesPage() {
  const [users, setUsers] = useState([]);
  const [order, setOrder] = useState([]);

  const [statusModal, toggleModal] = useState(false);

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Total",
      type: "number",
      name: "total",
      icon: "user",
      col: "half",
      required: "true",
    },
    { title: "Usuario", type: "select", name: "user", col: "half" },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const resUser = await getUsers();
      const res = await getOrder();
      setOrder(res.data);
      setUsers(resUser.data);
    }

    fetchData();
  }, []);

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
              action={() => toggleModal(!statusModal)}
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
          data={order}
        />
        <BaseModal
          fields={fieldsNew}
          data={users}
          title={"Nueva venta"}
          status={statusModal}
          changeStatus={toggleModal}
        />
      </div>
    </div>
  );
}
