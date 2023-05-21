import React from "react";

export const Select = (props) => {
  const { fields, action } = props;

  return (
    <div className="select" style={{ minWidth: "100%" }}>
      <select style={{ minWidth: "100%" }} {...action}>
        {fields.map((field, index) => (
          <option value={field.id} key={index}>
            {field.name}
          </option>
        ))}
      </select>
    </div>
  );
};
