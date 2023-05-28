import React from "react";

export const Switch = (props) => {
  const { change, checked, click } = props;

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={change}
        defaultChecked={checked}
        onClick={click}
      />
      <span className="slider round"></span>
    </label>
  );
};
