import React from "react";

export const Select = (props) => {
  const { fields, action, name, defaultValue, keySelect } = props;

  return (
    <div className="select" style={{ minWidth: "100%" }}>
      <select style={{ minWidth: "100%" }} defaultValue={defaultValue} {...action}>
        {fields.map((field, index) => (
          <option value={field.keySelect} key={index}>
            {field[name]}
          </option>
        ))}
      </select>
    </div>
  );
};
