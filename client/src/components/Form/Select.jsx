import React from "react";

export const Select = (props) => {
  const { fields, action, name, defaultValue, customOptions, nameSelect } = props;

  const options = customOptions || fields;
  const nameOption = nameSelect || name;

  return (
    <div className="select" style={{ minWidth: "100%" }}>
      <select style={{ minWidth: "100%" }} defaultValue={defaultValue} {...action}>
        {options.map((option, index) => (
          <option value={option.keySelect} key={index}>
            {option[nameOption]}
          </option>
        ))}
      </select>
    </div>
  );
};
