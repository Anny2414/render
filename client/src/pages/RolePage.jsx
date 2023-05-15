import { React, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Table } from "../components/Table/Table.jsx";
import { BaseModal } from "../components/BaseModal";

import { Button } from "../components/Buttons/Button.jsx";
import { Input } from "../components/Buttons/Input.jsx";

// CONEXION CON LA API DE USERS
import { getRoles } from "../api/roles.api";

export function RolePage() {
  const [roles, setRoles] = useState([]);

  const [statusModal, toggleModal] = useState(false);

  const fieldsNew = [
    {
      title: "Nombre",
      type: "text",
      name: "nombre",
      icon: "user",
      col: "full",
      disabled: "false",
    },
    { title: "Usuarios", type: "checkbox", name: "role", col: "4" },
    { title: "Clientes", type: "checkbox", name: "role", col: "4" },
    { title: "Productos", type: "checkbox", name: "role", col: "4" },
    { title: "Pedidos", type: "checkbox", name: "role", col: "4" },
    { title: "Roles", type: "checkbox", name: "role", col: "4" },
    { title: "Ventas", type: "checkbox", name: "role", col: "4" },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await getRoles();
      setRoles(res.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <Button
            text="Crear rol +"
            color="success"
            col="fullwidth"
            action={() => toggleModal(!statusModal)}
          />
          <Input placeholder="Buscar rol" icon="magnifying-glass" />
        </div>
        <Table
          headers={["id", "name", "created_at"]}
          columns={["ID", "Nombre", "Creado en"]}
          data={roles}
        />
        <BaseModal
          fields={fieldsNew}
          data={roles}
          title={"Nuevo rol"}
          status={statusModal}
          changeStatus={toggleModal}
        />
      </div>
    </div>
  );
}
