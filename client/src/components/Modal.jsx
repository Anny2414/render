import React, { useState, useEffect } from "react";

import { useForm } from "react-hook-form";
import Logo from "../assets/img/burger.jpg";
import { Input } from "./Form/Input";
import { Button } from "./Form/Button";
import { Select } from "./Form/Select";
import { DefaultCheckedSwitch } from "./Form/DefaultCheckedSwitch";

export function Modal(props) {
  const [ingredientes, setIngredientes] = useState([]);

  useEffect(() => {
    setIngredientes([]); // Reset ingredientes when the modal is opened
  }, [props.isOpen]);

  const {
    title,
    fields,
    onClose,
    dataSelect,
    nameSelect,
    buttonSubmit,
    button,
    submit,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="modal is-active">
      <form onSubmit={handleSubmit(submit)} encType="multipart/form-data">
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
              <div className="columns is-multiline">
                {fields.map((field, index) => (
                  <div className={`column is-${field.col}`} key={index}>
                    <div className="field is-vertical">
                      <div className="field-label" style={{ marginRight: 0 }}>
                        <label className="label has-text-centered">
                          {field.title}
                        </label>
                      </div>
                      {field.type === "text" ||
                      field.type === "number" ||
                      field.type === "password" ? (
                        <Input
                          type={field.type}
                          read_only={field.readonly}
                          name={field.name}
                          value={field.value}
                          icon={field.icon}
                          action={{
                            ...register(field.name, {
                              required: field.required,
                            }),
                          }}
                          error={errors[field.name]}
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="field is-grouped is-grouped-centered">
                          <div className="control">
                            <DefaultCheckedSwitch
                              checked={field.checked}
                              action={{ ...register(field.title) }}
                            />
                          </div>
                        </div>
                      ) : field.type === "file" ? (
                        <Input
                          type={field.type}
                          name={field.name}
                          value={field.value}
                          icon={field.icon}
                          action={{
                            ...register(field.name, {
                              required: field.required,
                            }),
                            onChange: (e) => {
                              // Actualiza el valor del campo de imagen
                              field.value = e.target.files[0];
                            },
                          }}
                          error={errors[field.name]}
                        />
                      ) : field.type === "list" ? (
                        <div>
                          {field.data === undefined ? (
                            <span>no valido</span>
                          ) : field.data && field.data.length > 0 ? (
                            field.data.map((ingrediente, index) => (
                              <div className="is-flex">
                                <div className="mx-auto">
                                  <span key={index}>
                                    {ingrediente?.supplies || ingrediente?.name}
                                  </span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="is-flex">
                              <div className="mx-auto">
                                <span>No Hay {field.title} disponibles.</span>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : field.type === "file" ? (
                        <Input
                          type={field.type}
                          name={field.name}
                          value={field.value}
                          icon={field.icon}
                          action={{
                            ...register(field.name, {
                              required: field.required,
                            }),
                            onChange: (e) => {
                              // Actualiza el valor del campo de imagen
                              field.value = e.target.files[0];
                            },
                          }}
                          error={errors[field.name]}
                        />
                      ) : field.type === "image" ? (
                        <div className="is-flex is-justify-content-center">
                          <img
                            src={field.image != null ? field.image : Logo}
                            alt={field.name}
                            width={200}
                            className="mx-auto"
                          />
                        </div>
                      ) : (
                        <div>
                          <Select
                            action={{ ...register(field.name) }}
                            fields={dataSelect}
                            name={nameSelect}
                            defaultValue={field.value}
                            customOptions={field.customOptions}
                            nameSelect={field.nameSelect}
                            hasButton={field.hasButton}
                            keySelect={field.keySelect}
                            textButton={field.textButton}
                            icon={field.icon}
                            actionButton={field.actionButton}
                            handleOptionChange={field.handleOptionChange}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <Button
              text="Cancelar"
              color="primary"
              action={onClose}
              type="button"
            />
            {buttonSubmit && (
              <Button text="Confirmar" color="success" type="submit" />
            )}
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
