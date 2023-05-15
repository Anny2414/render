import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";
import { BaseModal } from "../components/BaseModal.jsx";

import { Button } from "../components/Buttons/Button.jsx";
import { Input } from "../components/Buttons/Input.jsx";

// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { getRoles } from "../api/roles.api";

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [statusModal, toggleModal] = useState(false);

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Usuario",
      type: "text",
      name: "username",
      icon: "user",
      col: "half",
      required: "true",
    },
    {
      title: "Email",
      type: "text",
      name: "email",
      icon: "envelope",
      col: "half",
      required: "true",
    },
    {
      title: "Contraseña",
      type: "password",
      name: "password",
      icon: "key",
      col: "half",
      value: "yourburger123",
      readonly: "true",
    },
    { title: "Rol", type: "select", name: "role", col: "half" },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getUsers();
      const resRoles = await getRoles();
      setUsers(res.data);
      setRoles(resRoles.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <Button
            text="Crear usuario +"
            color="success"
            col="fullwidth"
            action={() => toggleModal(!statusModal)}
          />
          <Input placeholder="Buscar usuario" icon="magnifying-glass" />
          <Button text="Generar PDF" color="primary" col="fullwidth" />
        </div>
        <Table
          headers={["id", "role", "username", "email", "date"]}
          columns={["ID", "Rol", "Usuario", "Correo", "Creado en"]}
          data={users}
        />
        <BaseModal
          fields={fieldsNew}
          data={roles}
          title={"Nuevo usuario"}
          status={statusModal}
          changeStatus={toggleModal}
        />
      </div>
    </div>
  );
}
