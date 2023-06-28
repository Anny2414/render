import { useEffect, useState } from "react";
import '../assets/css/OrderPage.css'
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Button } from "../components/Form/Button";

export function OrderPage() {
    const a = [];
    const num = (number) => {
        a.push(number);

    }
    const delet = () => {
        a.length = 0;

    }
    return <div>
        <Navbar />
        <div className="container is-fluid mt-5 has-text-centered">
            <div className="columns ">

                <div className="column is-two-thirds">

                    <div className="is-flex">
                        <div className="is-justify-content-flex-start mr-auto">
                            <h1 className="h1">Pedido</h1>
                        </div>
                        <div className="is-justify-content-flex-end ml-auto  mt-3">
                            <Link to="/orders" className="button is-warning">Tus pedidos</Link>
                        </div>

                    </div>
                    <div className="hr"></div>


                </div>
            </div>
        </div>
    </div>
}