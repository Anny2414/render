import React from "react";

export const Input = (props) => {
  const { holder, icon, type, value, read_only, name, action } = props;

  return (
    <div className="control has-icons-left">
      <input
        className="input"
        type={type}
        placeholder={holder}
        value={value}
        name={name}
        readOnly={!!read_only}
        {...action}
      />
      <span className="icon is-small is-left">
        <i className={`fa-solid fa-${icon}`}></i>
      </span>
    </div>
  );
};
