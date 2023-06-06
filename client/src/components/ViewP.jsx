import React from "react";
import "../assets/css/ViewProducts.css";
import { Button } from "../components/Form/Button";
import { Link } from "react-router-dom";
import Logo from "../assets/img/burger.jpg";
import { ProductDetails } from "../components/ProductDetails";
import { SwitchP } from "../components/Form/SwitchP";


export function ViewP(props) {
  const { data, onEditClick, onDeleteClick, onViewDetails } = props;

  return (
    <div className="product-grid">
      {data.map((product) => (
        <div className="card card-pedido p-5" key={product.id}>
          <div class="is-flex is-justify-content-center">
            <div class=" mx-2">
              <Button
                color="warning"
                type="button"
                text={
                  <span className="icon">
                    <i className="fa-solid fa-pencil"></i>
                  </span>
                }
                action={() => onEditClick(product.id)}
              />
            </div>
            <div>
              <Button
                color="primary"
                type="button"
                text={
                  <span className="icon">
                    <i className="fa-solid fa-trash"></i>
                  </span>
                }
                action={() => onDeleteClick(product.id)}
              />
            </div>
            <div>
            </div>
            <SwitchP
              change={() => handleSwitchChange()}
              checked={product.status}
            />
          </div>
          <br />
          <br />
          {/* <Link to="/"> */}
          <img src={Logo} width="150" />
          {/* </Link> */}
          <b>
            <p>{product.name}</p>
          </b>
          <span>{product.price}</span>
          <input
            type="number"
            name=""
            id=""
            className="input number m-0"
            defaultValue="1"
            min="0"
          />
          <div class="is-flex is-justify-content-center">
            <div class="is-justify-content-flex-start mt-3 mr-2">
              <Button
                color="warning"
                type="button"
                text={
                  <span class="icon">
                    Ver mas
                  </span>
                }
                action={() => onViewDetails(product.id)}
              />
            </div>
            <div className="is-justify-content-flex-end ml-auto mt-3">
              <a href="" className="button is-success is-fullwidth" name="new">
                Agregar +
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}