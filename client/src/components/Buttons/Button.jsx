import React from "react";

export function Button(props) {
  const { text, color, col, action } = props;

  return (
    <div className="column">
      <button className={`button is-${color} is-${col}`} onClick={action}>
        {text}
      </button>
    </div>
  );
}
