import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { createUser } from "../api/users.api";
import { createOrder } from "../api/order.api";

export function BaseModal(props) {
  const { fields, data, title, status, changeStatus } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  
  const User = async (data) => {
    const res = await createUser(data);
  };
  const Order = async (data) => {
    const res = await createOrder(data);
  };

  const onSubmit = handleSubmit(async (data) => {

    if (location.pathname === "/users") {
      await User(data);
    } else if (location.pathname === "/sales") {
      await Order(data);
    }

    window.location.reload();
  });

  return (
    <>
      {/* Si el estado es True se muestra, de lo contrario no */}
      {status && (
        <div className={`modal modal-new is-active`}>
          <form className="form-new" onSubmit={onSubmit}>
            <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">{title}</p>
                <button
                  className="delete"
                  aria-label="close"
                  name="new"
                  type="button"
                  onClick={() => changeStatus(false)}
                ></button>
              </header>
              <section className="modal-card-body">
                <div className="container">
                  <div className="columns is-centered">
                    <div className="column is-full">
                      <div className="columns is-multiline">
                        {fields.map((field, index) => (
                          <div
                            className={`column is-${field.col}`}
                            key={`field-${index}`}
                          >
                            <div className="field is-vertical">
                              <div className="field-label">
                                <label className="label has-text-left">
                                  {field.title}
                                </label>
                              </div>
                              <div className="field-body">
                                <div className="field">
                                  <div className="control has-icons-left">
                                    {field.type == "select" ? (
                                      <div
                                        className="select"
                                        style={{ minWidth: "100%" }}
                                      >
                                        <select
                                          style={{ minWidth: "100%" }}
                                          {...register(field.name)}
                                        >
                                          {data.map((d) => (
                                            <option value={d.id} key={d.id}>
                                              {d.name} ({d.id})
                                            </option>
                                          ))}
                                        </select>
                                      </div>
                                    ) : field.type == "checkbox" ? (
                                      <div class={`column is-${field.col}`}>
                                        <div class="field is-centered has-text-centered">
                                          <label class="switch">
                                            <input type="checkbox" />
                                            <span class="slider round"></span>
                                          </label>
                                        </div>
                                      </div>
                                    ) : (
                                      <input
                                        className="input"
                                        type={field.type}
                                        value={field.value}
                                        readOnly={field.readonly}
                                        {...register(field.name, {
                                          required: field.required,
                                        })}
                                      />
                                    )}
                                    <span className="icon is-small is-left">
                                      <i className={`fas fa-${field.icon}`}></i>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <footer className="modal-card-foot">
                <button
                  className="button cancel is-primary"
                  name="new"
                  type="button"
                  onClick={() => changeStatus(false)}
                >
                  Cancelar
                </button>
                <button className="button is-success" type="submit">
                  Confirmar
                </button>
              </footer>
              {/* <div className="notifications">
                {errors && (
                  <div className="notification has-text-centered is-primary mt-5">
                    <b>Rellene todos los campos</b>
                  </div>
                )}
              </div> */}
            </div>
          </form>
        </div>
      )}
    </>
  );
}
