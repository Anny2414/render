import React, { useEffect, useState } from "react";
import "../assets/css/barra-carga.css"
export function Notification(props) {
  const { msg, color, buttons, timeout, onConfirm } = props;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timeout) {
      setIsLoading(true);

      const timer = setTimeout(() => {
        setIsLoading(false);
        props.onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, props]);

  const handleCancelClick = () => {
    props.onClose();
  };

  return (
    <div className={`notification has-text-centered is-${color} mt-5`}>
      <b>{msg}</b>
      {isLoading && (
        <div className="carga">
          <div
            className={`barra-carga has-background-${color}`}
            style={{ animation: `cargaAnimacion ${timeout}ms linear ` }}
          />
        </div>
      )}
      {buttons && (
        <div>
          <br />
          <button
            className="button is-small is-success mt-3"
            type="button"
            onClick={onConfirm}
          >
            Confirmar
          </button>
          <button
            className="button is-small is-error mt-3 ml-4"
            type="button"
            onClick={handleCancelClick}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
