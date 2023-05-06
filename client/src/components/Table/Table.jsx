import { React, useEffect, useState } from "react";
import { getData } from "../../api/users.api";
import { TableBar } from "./TableBar";
import "../../assets/css/Switch.css";
import "../../assets/css/ResponsiveTable.css";
import "../../assets/js/fontawesome.js";

export function Table(props) {
  // SE DEFINE PARA SABER SI LA TABLA DEBE MOSTRAR CIERTOS BOTONES Y HEADERS SON LAS COLUMNAS QUE APARECERAN
  const { showPdfButton, showAdminButton, headers } = props;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadData() {
      const res = await getData("users");
      setUsers(res.data);
    }

    loadData();
  }, []);

  return (
    <div className="container is-fluid mt-5">
      <TableBar {...props} />

      <div style={{ overflowX: "auto" }}>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.role}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.date}</td>
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={!!user.status} />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td>
                  <button
                    className="button edit is-warning"
                    type="button"
                    name="edit"
                  >
                    <span className="icon">
                      <i className="fa-solid fa-pencil"></i>
                    </span>
                  </button>
                </td>
                <td>
                  <button className="button is-primary" name="deleteUser">
                    <span className="icon">
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
