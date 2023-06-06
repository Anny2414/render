import React, { useEffect } from 'react';

export function Notification(props) {
  const { msg, color, buttons, timeout } = props;

  useEffect(() => {
    if (timeout) {
      const timeoutId = setTimeout(() => {
        // Aquí puedes definir cómo se debe manejar el tiempo de espera
        // Por ejemplo, puedes usar una función de callback para eliminar el componente
        props.onTimeout();
      }, timeout * 1000);

      // Limpia el temporizador si el componente se desmonta antes de que se cumpla el tiempo de espera
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [timeout]);

  return (
    <div className={`notification has-text-centered is-${color} mt-5`}>
      <b>{msg}</b>
      {buttons && (
        <div>
          <br />
          <button className="button is-small is-error mt-3" type="button">
            Cancelar
          </button>
          <button className="button is-small is-success mt-3 ml-4" type="button">
            Confirmar
          </button>
        </div>
      )}
    </div>
  );
}
