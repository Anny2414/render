import { React, useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { getData } from "../api/users.api";
import { Table } from "../components/Table/Table.jsx";
import { BaseModal } from "../components/BaseModal";

export function RolePage() {
  const [roles, setRoles] = useState([]);

  const fields = [
    {
      title: "Nombre",
      type: "text",
      name: "nombre",
      icon: "user",
      col: "full",
      disabled: "false",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      const res = await getData("roles");
      setRoles(res.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <TableBar showPdfButton={false} />
        <Table
          headers={["id", "name", "created_at"]}
          columns={["ID", "Nombre", "Creado en"]}
          data={roles}
        />
        <BaseModal fields={fields} />
      </div>
    </div>
  );
}
