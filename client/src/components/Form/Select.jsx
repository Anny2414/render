import React from "react";

export const Select = (props) => {
  const { fields, action, name, defaultValue } = props;

  return (
    <div className="select" style={{ minWidth: "100%" }}>
      <select style={{ minWidth: "100%" }} defaultValue={defaultValue} {...action}>
        {fields.map((field, index) => (
          <option value={field.id} key={index}>
            {field[name]}
          </option>
        ))}
      </select>
    </div>
  );
};
