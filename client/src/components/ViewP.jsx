import { React } from "react";
import "../assets/css/ViewProducts.css";


export function ViewP(props) {
    const { data } = props;
    console.log(data);

    return (
        <div>
            {
                data.map((product) => (
                    <div className="column is-one-fifth">
                        <div className="card card-pedido p-5">
                            <img src="" alt="" className="img" />
                            <b>
                                <p>{product.name}</p>
                            </b>
                            <span>{product.price}</span>
                            <input type="number" name="" id="" className="input number m-0" value="1" min="0" />
                            <div className="is-flex">
                                <div className="is-justify-content-flex-start mt-3">
                                    <button className="button is-warning" name="edit" type="button">
                                        Ver mas...
                                    </button>
                                </div>
                                <div className="is-justify-content-flex-end ml-auto mt-3">
                                    <a href="" className="button is-success is-fullwidth" name="new">Agregar +</a>
                                </div>
                            </div>
                        </div>

                    </div>
                ))
            }
        </div>

    );
}
