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
import { getContent, getContents, deleteContent } from "../api/content.api.js";
import { createContentO } from "../api/contentdetail.api.js";
import { Modal } from "../components/Modal.jsx";
import { useRef } from "react";

export function SalePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  const [products, setProducts] = useState([]);
  const [detail, setDetail] = useState([]);
  const [contents, setContents] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  // const ingredientes = useRef([]);
  const selectedOptionRef = useRef();


  useEffect(() => {
    const currentIngredients = ingredientes;
  }, [ingredientes]);

  const handleOptionChange = (event) => {
    const option = contents.find(
      (supplie) => supplie.supplies === event.target.value
    );
    selectedOptionRef.current = option;
  };

  const anadirIngrediente = () => {
    ingredientes.push(selectedOptionRef.current);
    setIngredientes([...ingredientes]);
  };

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

  const reloadDataTable = () => {
    setDetail([]);
    const storedDetail = Cookies.get("saleDetail");
    if (storedDetail) {
      setDetail(JSON.parse(storedDetail));
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchValue(value);
  };

  const handleCreateProduct = async (data) => {
    try {
      const users = (await getUsers()).data;
      const user = users[0];
      const orderData = { user: user.username, total: total, status: "Pago" };
      const respOrder = await createSale(orderData);
  
      const formDataDetails = [];
  
      for (let i = 0; i < detail.length; i++) {
        const product = detail[i];
        const contentsO = contents.filter(
          (content) => content.product === product.name
        );
  
        const formDataDetail = new FormData();
        formDataDetail.append("order", respOrder.data.id);
        formDataDetail.append("product", product.name);
        formDataDetail.append("amount", product.amount);
        formDataDetail.append("price", product.price);
        formDataDetail.append("contentOrder", JSON.stringify(contentsO));
  
        formDataDetails.push(formDataDetail);
      }
  
      const createdDetails = [];
  
      for (const formDataDetail of formDataDetails) {
        const respDetail = await createDetail(formDataDetail);
        createdDetails.push(respDetail.data);
  
        const contentOrder = JSON.parse(formDataDetail.get("contentOrder"));
  
        for (const content of contentOrder) {
          const formData = new FormData();
          formData.append("detail", respDetail.data.id);
          formData.append("supplies", content.supplies);
  
          await createContentO(formData);
        }
      }
  
      setDetail([]);
      setIngredientes([]);
      Cookies.remove("saleDetail");
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
    setIngredientes([])

    const content = contents.filter(
      (content) => content.product === selectedProduct.name
    );

    const fieldsEdit = [
      {
        title: "Producto",
        type: "text",
        name: "name",
        icon: "burger",
        col: "full",
        required: "true",
        value: selectedProduct.name,
        readonly: true
      },
      {
        title: "Ingredientes",
        hasButton: true,
        textButton: "+",
        type: "select",
        name: "supplies",
        icon: "list",
        col: "full",
        handleOptionChange: handleOptionChange,
        actionButton: anadirIngrediente,
      },
      {
        type: "list",
        headers: ["Nombre", "Precio"],
        key: ["name", "price"],
        data: ingredientes,
      },
    ];
    const handleEditSale = async (data) => {
      try {
        console.log(data);
        // closeModal(); // Close the modal after updating
      } catch (error) {
        console.error("Error al editar la venta:", error);
      }
    };


    openModal(
      "Editar venta",
      fieldsEdit,
      content,
      // [{ id: 0, supplies: 'No selecionado', price: 0, stock: 0, status: true }, ...content],
      "supplies",
      true,
      handleEditSale,
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
    setDetail((prevDetail) => {
      Cookies.remove("saleDetail");
      const newDetail = [...prevDetail, productWithSubtotal];
      Cookies.set("saleDetail", JSON.stringify(newDetail));
      return newDetail;
    });
  };

  const borrarDetalle = () => {
    setDetail([]);
    setIngredientes([]);
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
            <div className="is-flex footer mb-3">
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
                <Button
                  text={total + " $"}
                  color="success"
                  type="button"
                  className="pago"
                  action={handleCreateProduct}
                />
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
            isOpen={isOpen}
            onClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}