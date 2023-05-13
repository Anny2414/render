import React from "react";

export function Input(props) {
  const { placeholder, icon } = props;

  return (
    <div className="column is-9">
      <div className="control has-icons-left">
        <input className="input" type="text" placeholder={placeholder}></input>
        <span className="icon is-small is-left">
          <i className={`fa-solid fa-${icon}`}></i>
        </span>
      </div>
    </div>
  );
}
