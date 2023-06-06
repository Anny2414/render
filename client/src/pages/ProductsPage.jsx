import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { ViewP } from "../components/ViewP.jsx";
import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Modal } from "../components/Modal.jsx";


// CONEXION CON LA API DE USERS Y ROLES
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  editProduct,
  updateProductStatus,

} from "../api/products.api.js";
export function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  const openModal = (title, fields, dataSelect, nameSelect, buttonSubmit, submit) => {
    setModalConfig({ title, fields, dataSelect, nameSelect, buttonSubmit, submit });
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
  // Objeto para los campos de la ventana modal
  const fieldsNew = [
    {
      title: "Producto",
      type: "text",
      name: "name",
      icon: "burger",
      col: "half",
      required: "true",
    },
    {
      title: "Precio",
      type: "text",
      name: "price",
      icon: "dollar",
      col: "half",
      required: "true",
    },
    {
      title: "Descripción",
      type: "text",
      name: "description",
      icon: "comment",
      col: "half",
      required: "true",
    },


  ];


  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      setProducts(res.data);
    }

    fetchData();
  }, []);

  const handleCreateProduct = async (data) => {
    try {
      await createProduct(data);
      window.location.reload();
    } catch (error) {
      console.error("Error al crear el Producto:", error);
    }
  };
  

  const handleEditClick = async (productId) => {
    const res = await getProduct(productId);
    const product = res.data;


    const fieldsEdit = [
      {
        title: "Producto",
        type: "text",
        name: "name",
        icon: "burger",
        col: "half",
        required: "true",
        value: product.name,
      },
      {
        title: "Precio",
        type: "text",
        name: "price",
        icon: "dollar",
        col: "half",
        required: "true",
        value: product.price,
      },
      {
        title: "Descripción",
        type: "text",
        name: "description",
        icon: "comment",
        col: "half",
        required: "false",
        value: product.description,
      },


    ];
    
    const handleEditProduct = async (data) => {
      try {
        await editProduct(productId, data);
        window.location.reload();
      } catch (error) {
        console.error("Error al editar el Producto:", error);
      }
    };
    
    openModal("Editar producto", fieldsEdit, products ,"status", true, handleEditProduct);
  };
  const handleViewDetailsClicks = async (productId) => {
    const res = await getProduct(productId);
    const product = res.data;


    const fieldsview = [
      {
        title: "Producto",
        type: "text",
        name: "name",
        icon: "burger",
        col: "half",
        readonly: "true",
        value: product.name,   
      },
      {
        title: "Precio",
        type: "text",
        name: "dollar",
        icon: "envelope",
        col: "half",
        readonly: "true",
        value: product.price,
      },
      {
        title: "Descripción",
        type: "text",
        name: "description",
        icon: "comment",
        readonly: "true",
        col: "half",
        value: product.description,
      },


    ];
    
    openModal("Ver producto", fieldsview,products ,"status", false);
  };

  const handleStatusChange = async (productId, status) => {
    try {
      await updateProductStatus(productId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async(productId) => {
    await deleteProduct(productId);
    window.location.reload();
  };


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
              action={() =>
                openModal(
                  "Nuevo producto",
                  fieldsNew,
                  null,
                  null,
                  true,
                  handleCreateProduct,
                )
              }
            />

          </div>
          <div className="column is-9">
            <Input holder="Buscar Producto" icon="magnifying-glass" />
          </div>
          <div className="column is-fullwidth">
            <Button text="Generar PDF" color="primary" col="fullwidth" />
          </div>
        </div>
        <ViewP
          onStatusClick={handleStatusChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onViewDetails={handleViewDetailsClicks}
          data={products} />

      </div>
      
      {isOpen && (
        <Modal
          title={modalConfig.title}
          fields={modalConfig.fields}
          dataSelect={modalConfig.dataSelect}
          nameSelect={modalConfig.nameSelect}
          onClose={closeModal}
          buttonSubmit = {modalConfig.buttonSubmit}
          submit={modalConfig.submit}
        />
      )}

    </div>
  );
}
