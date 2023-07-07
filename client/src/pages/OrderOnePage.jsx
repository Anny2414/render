import { useEffect, useState } from "react";
import '../assets/css/OrderPage.css'
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Button } from "../components/Form/Button";
import Cookies from "js-cookie";
import { Detalle } from "../components/Detalle";
import { Info } from "../components/Info";

export function OrderPage() {
    const [products, setProducts] = useState([])
    const a = [];
    const num = (number) => {
        a.push(number);

    }
    const delet = () => {
        a.length = 0;

    }

    useEffect(() => {
        const getStoredDetail = () => {
            const storedDetail = Cookies.get("orderDetail");
            if (storedDetail) {
                setProducts(JSON.parse(storedDetail));
            }
        };

        getStoredDetail();
    }, []);

    const reloadDataTable = async () => {
        setProducts([]);
        const storedDetail = Cookies.get("orderDetail");
        if (storedDetail) {
            setProducts(JSON.parse(storedDetail));
        }
    };

    const handleAmountChange = (productId, event) => {
        console.log("entro");
        const updatedProducts = products.map((product) => {
          if (product.id === productId) {
            return { ...product, amount: parseInt(event.target.value) };
          }
          return product;
        });
      
        Cookies.set("orderDetail", JSON.stringify(updatedProducts));
        setProducts(updatedProducts);
        reloadDataTable()
      };
      

      


    const removeProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id != productId);
        Cookies.set("orderDetail", JSON.stringify(updatedProducts));
        reloadDataTable()
    };
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
                    <Detalle
                        products={products}
                        deleteP={removeProduct}
                        handleAmountChange={handleAmountChange}
                    />




                </div>
                <div className="column is-one-third">
                    <Info
                        products={products}
                    />
                </div>
            </div>
        </div>
    </div>
}