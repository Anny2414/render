import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { ViewP } from "../components/ViewP.jsx";
import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Modal } from "../components/Modal.jsx";
import { Table } from "../components/Table/Table.jsx";

import { useRef } from "react";

import Cookies from "js-cookie";

// CONEXION CON LA API DE USERS Y ROLES
import {
  getProducts,
  createProduct,
  deleteProduct,
  getProduct,
  editProduct,
  updateProductStatus,
} from "../api/products.api.js";
import { getSupplies } from "../api/supplies.api.js";
import { createContent } from "../api/content.api.js";

// import {createContent} from "../api/"

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  // const ingredientes = useRef([]);
  const selectedOptionRef = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();

  useEffect(() => {
    const currentIngredients = ingredientes;
    console.log(currentIngredients);
  }, [ingredientes]);
  
  const reloadDataTable = async () => {
    setProducts([]);
    const res = await getProducts();
    setProducts(res.data);
  };



  const handleOptionChange = (event) => {
    const option = supplies.find(
      (supplie) => supplie.name === event.target.value
    );
    selectedOptionRef.current = option;
  };

  const anadirIngrediente = () => {
    if (selectedOptionRef.current != undefined) {
      ingredientes.push(selectedOptionRef.current);
      setIngredientes([...ingredientes]); // Actualiza el estado de ingredientes
      console.log(ingredientes);
      
    } else {
      console.log("error al añadir");
    }
  };
  

  const openModal = (
    title,
    fields,
    dataSelect,
    nameSelect,
    buttonSubmit,
    submit
  ) => {
    if (nameSelect === "supplies") {
      dataSelect = supplies.map((supplie) => ({
        value: supplie.id,
        label: supplie.name,
      }));
    }

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
      type: "number",
      name: "price",
      icon: "dollar",
      col: "half",
      required: "true",
    },
    {
      title: "Imagen",
      type: "file",
      name: "image",
      icon: "dollar",
      col: "half",
      require: true,
      multiple: false,
    },
    {
      title: "Descripción",
      type: "text",
      name: "description",
      icon: "comment",
      col: "half",
      required: "true",
    },
    {
      title: "Ingredientes",
      hasButton: true,
      textButton: "+",
      type: "select",
      name: "supplies",
      icon: "list",
      required: "false",
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

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      setProducts(res.data);
    }

    async function fetchSupplies() {
      const res = await getSupplies();
      setSupplies(res.data);
    }

    fetchSupplies();
    fetchData();
  }, []);

  const handleCreateProduct = async (data) => {
    try {
      anadirIngrediente(data);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("price", data.price);
      formData.append("description", data.description);
      formData.append("status", true);

      // Agrega cada archivo individualmente
      for (let i = 0; i < data.image.length; i++) {
        formData.append("image", data.image[i]);
      }

      const produc = await createProduct(formData);

      for (let index = 0; index < ingredientes.length; index++) {
        const ingrediente = ingredientes[index];
        const formData1 = new FormData();
        formData1.append("product", produc.data.name);
        formData1.append("supplies", ingrediente.name
        );
        formData1.append("count", 1);
  
        await createContent(formData1);
        
      }

      reloadDataTable();
      closeModal();
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
        type: "number",
        name: "price",
        icon: "dollar",
        col: "half",
        required: "true",
        value: product.price,
      },
      {
        title: "Imagen",
        type: "file",
        name: "image",
        icon: "image",
        col: "half",
        //value:product.image,   // Valor actual de la imagen del producto
        multiple: false,
      },
      {
        title: "Descripción",
        type: "text",
        name: "description",
        icon: "comment",
        col: "half",
        required: "true",
        value: product.description,
      },
      {
        title: "Supplies",
        type: "select",
        name: "supplies",
        icon: "list",
        col: "full",
        required: "false",
      },
    ];

    const handleEditProduct = async (data) => {
      const { name, price, description } = data;

      try {
        const updateData = new FormData();
        updateData.append("name", data.name);
        updateData.append("price", data.price);
        updateData.append("description", data.description);

        const res = await editProduct(productId, updateData);
        const updatedProduct = res.data;

        closeModal();

        // Actualizar la lista de productos sin recargar la página
        setProducts((prevProducts) => {
          const updatedProducts = prevProducts.map((product) => {
            if (product.id === productId) {
              // Actualizar los datos del producto editado
              return {
                ...product,
                name: name,
                price: price,
                image: updatedProduct.image, // Actualizar el campo "image" con la URL de la nueva imagen
                description: description,
                // Actualizar otros campos si es necesario
              };
            }
            return product;
          });
          return updatedProducts;
        });
      } catch (error) {
        console.error("Error al editar el Producto:", error);
      }
    };

    openModal(
      "Editar producto",
      fieldsEdit,
      products,
      "status",
      true,
      handleEditProduct
    );
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
        name: "price",
        icon: "dollar",
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

    openModal("Ver producto", fieldsview, products, "status", false);
  };

  const handleStatusChange = async (productId, status) => {
    try {
      await updateProductStatus(productId, !status);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (productId) => {
    await deleteProduct(productId);
    reloadDataTable();
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <div className="columns is-centered">
          <div className="column is-fullwidth">
            {/* <Table
              headers =  {[ "Nombre" , "Precio"]}
              key =  {[ "name" , "price"]}
              data = {[]}
            /> */}
            <Button
              text="Crear Producto +"
              color="success"
              col="fullwidth"
              action={() =>
                openModal(
                  "Nuevo producto",
                  fieldsNew,
                  [{id: 0, name: 'No selecionado', price: 0, stock: 0, status: true}, ...supplies],
                  "name",
                  true,
                  handleCreateProduct
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
          data={products}
        />
      </div>

      {isOpen && (
        <Modal
          title={modalConfig.title}
          fields={modalConfig.fields}
          dataSelect={modalConfig.dataSelect}
          nameSelect={modalConfig.nameSelect}
          onClose={closeModal}
          buttonSubmit={modalConfig.buttonSubmit}
          submit={modalConfig.submit}
        />
      )}
    </div>
  );
}
