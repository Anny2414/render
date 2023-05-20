import React from "react";

export function Button(props) {
  const { text, color, col, action, type } = props;

  return (
    <button
      className={`button is-${color} is-${col}`}
      onClick={action}
      type={type}
    >
      {text}
    </button>
  );
}
