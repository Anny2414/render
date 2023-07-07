import React from "react";
import "../assets/css/ViewProducts.css";
import { Button } from "../components/Form/Button";
import { Link } from "react-router-dom";
import Logo from "../assets/img/burger.jpg";
import { SwitchP } from "../components/Form/SwitchP";
import { useState } from "react";

export function ViewP(props) {
  const { data, onEditClick, onDeleteClick, onViewDetails, onStatusClick, onAdd } = props;

  return (
    <div className="product-grid">
      {data.map((product) => {



        const [statusSlider, setStatus] = useState(product.status);

        const handleSwitchChange = (productId, status) => {
          onStatusClick(productId, status);
          setStatus(!statusSlider);
        };
        
        return (
          <div className="card card-pedido p-5" key={product.id}>
            <div className="is-flex is-justify-content-center">
              <div className=" mx-2">
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
              <div></div>
              <SwitchP
                change={() => handleSwitchChange(product.id, statusSlider)}
                checked={statusSlider}
              />
            </div>
            <br />
            <br />
            {/* <Link to="/"> */}
            <img
              className="image-product"
              src={product.image != null ? product.image : Logo}
              width="150"
              alt="Product"
            />
            {/* </Link> */}
            <b>
              <p>{product.name}</p>
            </b>
            <span>${product.price}</span>
            <input
              type="number"
              name=""
              id=""
              className="input number m-0"
              defaultValue="1"
              min="0"
            />
            <div className="is-flex is-justify-content-center">
              <div className="is-justify-content-flex-start mt-3 mr-2">
                <Button
                  color="warning"
                  type="button"
                  text={
                    <span className="icon">
                      Ver mas
                    </span>
                  }
                  action={() => onViewDetails(product.id)}
                />
              </div>
              <div className="is-justify-content-flex-end ml-auto mt-3">
                <Button
                text = "Agregar"
                color = "success"
                action = {() => onAdd(product)}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
