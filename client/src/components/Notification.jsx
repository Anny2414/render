import React, { useEffect } from 'react';

export function Notification(props) {
  const { msg, color, buttons, timeout, onConfirm } = props;

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        props.onClose();
      }, timeout);

      return () => clearTimeout(timer);
    }
  }, [timeout, props]);

  return (
    <div className={`notification has-text-centered is-${color} mt-5`}>
      <b>{msg}</b>
      {buttons && (
        <div>
          <br />
          <button className="button is-small is-error mt-3" type="button">
            Cancelar
          </button>
          <button
            className="button is-small is-success mt-3 ml-4"
            type="button"
            onClick={onConfirm} // Agrega el evento onClick para llamar a la función onConfirm cuando se haga clic en "Confirmar"
          >
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}
