import React from "react";
import { useLocation } from "react-router-dom";

export function BaseModal(props) {
  const { fields } = props;

  const url = useLocation();
  let buttonsText = "None";

  if (url.pathname === "/users") {
    buttonsText = "usuario";
  } else if (url.pathname === "/roles") {
    buttonsText = "rol";
  }

  return (
    <div className="modal modal-new is-active">
      <form className="form-new">
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Nuevo {buttonsText}</p>
            <button
              className="delete"
              aria-label="close"
              name="new"
              type="button"
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half">
                  {fields.map((field) => (
                    <div className="field is-vertical">
                      <div className="field-label">
                        <label className="label has-text-centered">
                          {field}
                        </label>
                      </div>
                      <div className="field-body">
                        <div className="field">
                          <p className="control has-icons-left">
                            <input className="input" type="text" />
                            <span className="icon is-small is-left">
                              <i className="fas fa-user"></i>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button
              className="button cancel is-primary"
              name="new"
              type="button"
            >
              Cancelar
            </button>
            <button className="button is-success" type="submit">
              Confirmar
            </button>
          </footer>
          <div className="notifications"></div>
        </div>
      </form>
    </div>
  );
}
