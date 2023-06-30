import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx";
import { Button } from "../components/Form/Button.jsx";
import { ListProducts } from "../components/ListProducts.jsx";
import { Input } from "../components/Form/Input.jsx";
import Cookies from "js-cookie";
import "../assets/css/ViewProducts.css";
import "../assets/css/OrderPage.css";
// CONEXION CON LA API DE USERS Y ROLES
import { getUsers } from "../api/users.api";
import { getProducts, getProduct } from "../api/products.api.js";
import {
  getSales,
  createSale,
  deleteSale,
  editSale,
  getSale,
} from "../api/sales.api.js";
import {
  getDetail,
  createDetail,
  deleteDetail,
  editDetail,
  getDetails,
} from "../api/detail.api.js";
import { getContent, getContents } from "../api/content.api.js";
import { Modal } from "../components/Modal.jsx";

export function SalePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const [contents, setContents] = useState([]);

  let total = 0;

  const openModal = (
    title,
    fields,
    dataSelect,
    nameSelect,
    buttonSubmit,
    submit
  ) => {
    setModalConfig({
      title,
      fields,
      dataSelect,
      nameSelect,
      buttonSubmit,
      submit,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    async function fetchData() {
      const resProduct = await getProducts();
      const resContent = await getContents();
      setProducts(resProduct.data);
      setContents(resContent.data);
    }
    const storedDetail = Cookies.get("saleDetail");
    if (storedDetail) {
      setDetail(JSON.parse(storedDetail));
    }

    fetchData();
  }, []);

  const reloadDataTable = async () => {
    setDetail([]);
    const storedDetail = await Cookies.get("saleDetail");
    if (storedDetail) {
      await setDetail(JSON.parse(storedDetail));
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
  };

  const handleCreateProduct = async (data) => {
    try {
      const users = await getUsers();
      const user = users[0];
      const orderData = { user: user.name, total: total, status: "Pago" };
      const respOrder = await createSale(orderData);
      const detailData = data.map((product) => ({
        order: respOrder.data.id,
        product: product.product,
        amount: product.amount,
        price: product.price,
        contentOrder: [], // Inicializar el array contentOrder vacío
      }));

      for (let i = 0; i < detailData.length; i++) {
        const detail = detailData[i];
        const respDetail = await createDetail(detail);
        const contentOrderData = detail.contentOrder.map((content) => ({
          order: respDetail.data.id,
          supplies: content.supplies,
        }));

        for (let j = 0; j < contentOrderData.length; j++) {
          const content = contentOrderData[j];
          await createContentOrder(content);
        }
      }
    } catch (error) {
      console.error("Error al crear la venta:", error);
    }
  };
  const handleDeleteClick = (productId) => {
    setDetail((prevDetail) => {
      const updatedDetail = prevDetail.filter(
        (product) => product.indexer !== productId
      );
      Cookies.set("saleDetail", JSON.stringify(updatedDetail));
      return updatedDetail;
    });
    reloadDataTable();
  };
  const handleEditClick = async (selectedProduct, selectIndexer) => {
    const content = contents.filter(
      (content) => content.product === selectedProduct.name
    );
    const headers = ["Nombre", "Precio"];
    const key = ["name", "Price"];
    const detai = detail.filter((detail) => detail.indexer === selectIndexer);
    console.log(detai);
    console.log(content);
    const fieldsEdit = [
      {
        type: "list",
        headers,
        key,
        data: detai,
        content,
        col: "full",
      },
      {
        title: "Ingrediente",
        type: "select",
        name: "contentOrder",
        col: "col",
        icon: "lock-open",
        keySelect: "supplies",
        nameSelect: "supplies",
        customOptions: content,
      },
      //   {
      //     title: "Ingrediente",
      //     type: "button",

      //   },
    ];
    const handleEditUser = async (data) => {
      try {
        console.log(data);
        editarContenido(selectIndexer, data); // Actualiza el contenido del producto en la cookie
      } catch (error) {
        console.error("Error al editar la venta:", error);
      }
    };

    openModal(
      "Editar venta",
      fieldsEdit,
      content,
      "supplies",
      true,
      handleEditUser
    );
  };

  const editarContenido = (indexer, nuevoContenido) => {
    setDetail((prevDetail) => {
      const updatedDetail = prevDetail.map((product) => {
        if (product.indexer === indexer) {
          return {
            ...product,
            contentOrder: nuevoContenido,
          };
        }
        return product;
      });
      Cookies.set("saleDetail", JSON.stringify(updatedDetail));
      return updatedDetail;
    });
  };
  const añadirProducto = (data) => {
    const subtotal = data.price * data.amount;
    const productWithSubtotal = { ...data, subtotal }; // Añade el subtotal al objeto de producto
    console.log(data);
    setDetail((prevDetail) => {
      Cookies.remove("saleDetail");
      const newDetail = [...prevDetail, productWithSubtotal];
      Cookies.set("saleDetail", JSON.stringify(newDetail));
      return newDetail;
    });
  };

  const borrarDetalle = () => {
    setDetail([]);
    Cookies.remove("saleDetail");
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="columns is-centered ">
          <div className="column is-three-quarters card-venta list-detail">
            <div className="has-text-centered">
              <h1 className="h2 ">Crear Venta</h1>
            </div>
            <div className="hr"></div>
            <h1 className="h2">Detalle</h1>
            <Table
              headers={["#", "name", "price", "amount", "subtotal"]}
              columns={["#", "Nombre", "Precio", "Cantidad", "Subtotal"]}
              delete
              edit
              onEditClick={handleEditClick}
              onDeleteClick={handleDeleteClick}
              data={detail}
              itemsPorPage={3}
            />
            <div className="is-flex footer">
              <div className="is-justify-content-flex-start mr-auto">
                <Button
                  text="Borrar Detalle"
                  color="danger"
                  action={borrarDetalle}
                  className="mt-5"
                />
              </div>
              <div className="is-justify-content-flex-end ml-auto">
                {detail.map((product) => {
                  total = total + product.subtotal;
                })}
                <h1 className="h1 ">{total} $</h1>
              </div>
            </div>
          </div>
          <div className="column card-venta2">
            <h1 className="h2">Productos</h1>

            <ListProducts products={products} add={añadirProducto} />
          </div>
        </div>
        <div></div>
        {isOpen && (
          <Modal
            title={modalConfig.title}
            fields={modalConfig.fields}
            dataSelect={modalConfig.dataSelect}
            nameSelect={modalConfig.nameSelect}
            buttonSubmit={modalConfig.buttonSubmit}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}
