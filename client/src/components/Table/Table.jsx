import React, {useState} from "react";
import "../../assets/css/Switch.css";
import "../../assets/css/ResponsiveTable.css";
import "../../assets/js/fontawesome.js";
import { updateUserStatus } from "../../api/users.api"; 

// FORM COMPONENTS
import { Button } from "../Form/Button.jsx";

export function Table(props) {
  const {
    headers,
    columns,
    data,
    edit,
    delete: showDelete,
    status,
    onEditClick,
    onDeleteClick,
  } = props;

  const handleStatusChange = async (userId, status) => {
  try {
    await updateUserStatus(userId, status);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div style={{ overflowX: "auto" }}>
      <table className="table is-fullwidth">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
            {status && <th>Estado</th>}
            {edit && <th>Editar</th>}
            {showDelete && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
              {status && (
                <td>
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        handleStatusChange(row.id, e.target.checked)
                      }
                      }
                      checked={row.status}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
              )}
              {edit && (
                <td>
                  <Button
                    color="warning"
                    type="button"
                    text={
                      <span className="icon">
                        <i className="fa-solid fa-pencil"></i>
                      </span>
                    }
                    action={() => onEditClick(row.id)}
                  />
                </td>
              )}
              {showDelete && (
                <td>
                  <Button
                    color="primary"
                    type="button"
                    text={
                      <span className="icon">
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    }
                    action={() => onDeleteClick(row.id)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
