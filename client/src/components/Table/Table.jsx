import { useState, useEffect } from "react";
import "../../assets/css/Switch.css";
import "../../assets/css/ResponsiveTable.css";
import "../../assets/js/fontawesome.js";

// FORM COMPONENTS
import { Button } from "../Form/Button.jsx";
import { Switch } from "../Form/Switch";

import { getPermissions } from "../../api/permissions.api";

function TableRow({ row, headers, status, edit, showDelete, onStatusClick, onEditClick, onDeleteClick }) {
  const [statusSlider, setStatus] = useState(row.status);
  const [permisos, setPermisos] = useState(null);

  const mostrarPermisos = async (id) => {
    const permisos = await getPermissions(id);
    setPermisos(permisos);
  };

  const handleSwitchChange = async () => {
    onStatusClick(row.id, statusSlider);
    setStatus(!statusSlider);
  };

  useEffect(() => {
    mostrarPermisos(row.id);
  }, [row.id]);

  return (
    <tr key={row.id}>
      {headers.map((header) => (
        <td key={header}>
        {header === "permissions" ? (
          <span>{permisos}</span>
        ) : (
          row[header]
        )}
      </td>
      ))}
      {status && (
        <td>
          <Switch change={handleSwitchChange} checked={statusSlider} />
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
  );
}

export function Table(props) {
  const {
    headers,
    columns,
    data,
    edit,
    delete: showDelete,
    status,
    onStatusClick,
    onEditClick,
    onDeleteClick,
  } = props;

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
            <TableRow
              key={row.id}
              row={row}
              headers={headers}
              status={status}
              edit={edit}
              showDelete={showDelete}
              onStatusClick={onStatusClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
