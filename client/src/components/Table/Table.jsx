import { React } from "react";
import { TableBar } from "./TableBar";
import "../../assets/css/Switch.css";
import "../../assets/css/ResponsiveTable.css";
import "../../assets/js/fontawesome.js";

export function Table(props) {
  // SE DEFINE PARA SABER SI LA TABLA DEBE MOSTRAR CIERTOS BOTONES Y HEADERS SON LAS COLUMNAS QUE APARECERAN
  const { headers, data } = props;

  return (
    
      <div style={{ overflowX: "auto" }}>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                {headers.map((header) => (
                  <td key={header}>{row[header]}</td>
                ))}
                <td>
                  <label className="switch">
                    <input type="checkbox" checked={!!row.status} />
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
  );
}
