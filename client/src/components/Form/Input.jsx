import React, { useState, useEffect } from "react";

export const Input = (props) => {
  const {
    holder,
    icon,
    type,
    value,
    onChange,
    read_only,
    name,
    action,
    error,
    style,
    disabled,
  } = props;

  const styls = style || "";

  // Estado para controlar si el input está habilitado o deshabilitado
  const [isInputDisabled, setIsInputDisabled] = useState(!!disabled);

  // Actualizar el estado si la prop 'disabled' cambia
  useEffect(() => {
    setIsInputDisabled(!!disabled);
  }, [disabled]);

  return (
    <div className="field-body">
      <div className="field">
        <div className="control has-icons-left">
          <input
            id={name}
            className={`input ${error ? "is-error" : ""} ${styls}`}
            type={type}
            placeholder={holder}
            defaultValue={value}
            disabled={isInputDisabled}
            onChange={onChange}
            name={name}
            readOnly={!!read_only}
            {...action}
          />
          <span className="icon is-small is-left">
            <i className={`fa-solid fa-${icon}`}></i>
          </span>
        </div>
      </div>
    </div>
  );
};
