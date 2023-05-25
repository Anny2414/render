import React, { useState } from "react";

import { useForm } from "react-hook-form";

import { Input } from "./Form/Input";
import { Button } from "./Form/Button";
import { Select } from "./Form/Select";

export function Modal({ title, fields, onClose, dataSelect, nameSelect, submit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="modal is-active">
      <form onSubmit={handleSubmit(submit)}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button
              className="delete"
              aria-label="close"
              name="new"
              type="button"
              onClick={onClose}
            ></button>
          </header>
          <section className="modal-card-body">
            <div className="container">
              {fields.map((field, index) => (
                <div className="column" key={index}>
                  <div className="field is-vertical">
                    <div className="field-label">
                      <label className="label has-text-centered">
                        {field.title}
                      </label>
                    </div>
                    <div className="field-body">
                      <div className="field">
                        <div className="control has-icons-left">
                          {field.type == "text" || field.type == "password" ? (
                            <Input
                              type={field.type}
                              read_only={field.readonly}
                              name={field.name}
                              value={field.value}
                              action={{
                                ...register(field.name, {
                                  required: field.required,
                                }),
                              }}
                              error={errors[field.name]}
                            />
                          ) : (
                            <Select
                              action={{ ...register(field.name) }}
                              fields={dataSelect}
                              name={nameSelect}
                              defaultValue={field.value}
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
          </section>
          <footer className="modal-card-foot">
            <Button
              text="Cancelar"
              color="primary"
              action={onClose}
              type="button"
            />
            <Button text="Confirmar" color="success" type="submit" />
          </footer>
          <div className="notifications">
            {Object.keys(errors).length > 0 && (
              <div className="notification has-text-centered is-primary mt-5">
                <b>Rellene todos los campos</b>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
