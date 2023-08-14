import React from "react";
import Logo from "../assets/img/burger.jpg";
import { Link } from "react-router-dom";
import { Button } from "./Form/Button";
import Cookies from "js-cookie";
import { Input } from "./Form/Input";
import { ModalSale } from "./modal.sale";
export function Detalle(props) {
    const { products, deleteP, EditP, handleAmountChange } = props;
    return (
        <div className="product-grid">
            {products.map((product) => (
                <div className="card-pedido p-5" key={product.id}>
                    <div className="is-flex mb-2">
                        <Button
                            color="warning is-justify-content-flex-start mr-auto"
                            text={<span className="icon">
                                <i className="fa-solid fa-pencil"></i>
                            </span>}
                            action={() => EditP(product)}
                        />
                        <Button
                            color="primary is-justify-content-flex-end ml-auto"
                            text={ <span className="icon">
                            <i className="fa-solid fa-trash"></i>
                          </span>}
                            action={() => deleteP(product.id)}
                        />
                    </div>
                    <img
                        src={product.image != null ? product.image : Logo}
                        alt=""
                        className="img"
                    />
                    <b>
                        <p>{product.name}</p>
                    </b>
                    <span>{product.price}$</span>
                    <input
                        className="input"
                        type="number"
                        defaultValue={product.amount}
                        onChange={(event) => handleAmountChange(product.id, event)}
                        min={1}
                    />
                </div>
            ))}
                <div className="card añadir card-pedido p-5">
                    <Link to={"/products"} className="mas m-auto">
                        <i className="fa-light fa-plus plus mas"></i>
                    </Link>
                </div>
        </div>
    );
}
