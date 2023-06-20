import React from "react";

export const Switch = (props) => {
  const { change, checked, click, action  } = props;

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={change}
        defaultChecked={checked}
        onClick={click}
        {...action}
      />
      <span className="slider round"></span>
    </label>
  );
};
