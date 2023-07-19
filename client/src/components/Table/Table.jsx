import { useState, useEffect } from "react";
import "../../assets/css/Switch.css";
import "../../assets/css/ResponsiveTable.css";
import "../../assets/js/fontawesome.js";

// FORM COMPONENTS
import { Button } from "../Form/Button.jsx";
import { Switch } from "../Form/Switch";

import { getPermissions } from "../../api/permissions.api";

function TableRow({
  row,
  headers,
  status,
  edit,
  showDelete,
  onStatusClick,
  onEditClick,
  onDeleteClick,
  count,
}) {
  const [statusSlider, setStatus] = useState(row.status);
  const [permisos, setPermisos] = useState([]);

  const mostrarPermisos = async (id) => {
    const permisos = await getPermissions(id);
    setPermisos(permisos);
  };

  const handleSwitchChange = async () => {
    onStatusClick(row.id, statusSlider);
  };

  useEffect(() => {
    mostrarPermisos(row.id);
  }, [row.id]);

  return (
    <tr key={row.id}>
      {headers.map((header) => (
        <td key={header}>
          {header === "#" ? (
            <span>{count}</span>
          ) : header === "permissions" ? (
            <span>{permisos.join(" - ")}</span>
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
            action={() => {
              row.indexer != undefined
                ? onEditClick(row, row.indexer)
                : onEditClick(row.id);
            }}
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
            action={() => {
              row.indexer != undefined
                ? onDeleteClick(row.indexer)
                : onDeleteClick(row.id);
            }}
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
    itemsPorPage,
  } = props;

  const [count, setCount] = useState(1);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = itemsPorPage || 5;
  const offset = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
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
            {currentData.map((row, index) => (
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
                count={count + index + offset}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* Paginador */}
      <div className="mt-5">
        <nav
          className="pagination is-centered"
          role="navigation"
          aria-label="pagination"
        >
          <ul className="pagination-list">
            {Array.from({ length: pageCount }, (_, index) => {
              const page = index + 1;
              return (
                <li key={page}>
                  <a
                    className={`pagination-link${
                      currentPage === page ? " is-current" : ""
                    }`}
                    aria-label={`Ir a la página ${page}`}
                    onClick={() => handlePageChange(page)}
                  >
                    <b>{page}</b>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}
