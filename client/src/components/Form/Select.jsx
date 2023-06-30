import React from "react";

import { Button } from "./Button";

export const Select = (props) => {
  const {
    fields,
    action,
    icon,
    name,
    defaultValue,
    customOptions,
    keySelect,
    nameSelect,
    hasButton,
    textButton,
    actionButton,
    handleOptionChange,
  } = props;

  const options = customOptions || fields;
  const nameOption = nameSelect || name;

  if (hasButton == true) {
    return (
      <div className="field has-addons">
        <div className="control has-icons-left is-expanded">
          <span className="icon is-small is-left">
            <i className={`fa-solid fa-${icon}`}></i>
          </span>
          <div className="select is-fullwidth">
            <select onChange={handleOptionChange}>
              {options.map((option, index) => (
                <option value={option.keySelect} key={index}>
                  {option[nameOption]}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="control">
          <Button
            text={textButton}
            color="success"
            type="button"
            action={actionButton}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="field-body">
      <div className="field">
        <div className="control has-icons-left">
          <span className="icon is-small is-left">
            <i className={`fa-solid fa-${icon}`}></i>
          </span>
          <div className="select" style={{ minWidth: "100%" }}>
            <select
              style={{ minWidth: "100%" }}
              defaultValue={defaultValue}
              {...action}
            >
              {options.map((option, index) => (
                <option value={option[keySelect]} key={index}>
                  {option[nameOption]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
