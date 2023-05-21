import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { getProducts } from "../api/products.api.js";
import { ViewP } from "../components/ViewP.jsx";

import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";

export function ProductsPage() {
  const [products, setProducts] = useState([]);

  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Producto",
      type: "text",
      name: "name",
      icon: "user",
      col: "half",
      required: true,
    },
    {
      title: "Precio",
      type: "int",
      name: "price",
      icon: "envelope",
      col: "half",
      required: true,
    },
    {
      title: "Descripcion",
      type: "text",
      name: "description",
      icon: "key",
      col: "half",
      readonly: true,
    },
    { title: "Estado", type: "select", name: "status", col: "half" },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      setProducts(res.data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            <Button
              text="Crear Producto +"
              color="success"
              col="fullwidth"
              action={() => toggleModal(!statusModal)}
            />
          </div>
          <div className="column is-9">
            <Input holder="Buscar Producto" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        <ViewP data={products} />

        <BaseModal
          fields={fieldsNew}
          data={products}
          title={"Nuevo Producto"}
          status={statusModal}
          changeStatus={toggleModal}
        />
      </div>
    </div>
  );
}
