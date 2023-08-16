// GENERACION DE PDF
import jsPDF from "jspdf";
import "jspdf-autotable";

import Logo from "../assets/img/Logo.png"; // Imagen que sera usada en el PDF

import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { ViewP } from "../components/ViewP.jsx";
import { Button } from "../components/Form/Button.jsx";
import { Input } from "../components/Form/Input.jsx";
import { Modal } from "../components/Modal.jsx";
import { Table } from "../components/Table/Table.jsx";
import { Notification } from "../components/Notification.jsx";


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
import { getSupplies, getSupplie } from "../api/supplies.api.js";
import { createContent, editContent, getContents } from "../api/content.api.js";

// import {createContent} from "../api/"

export function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [supplies, setSupplies] = useState([]);
  const [contents, setContents] = useState([]);
  const [order, setOrder] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [ingredientes1, setIngredientes1] = useState([]);
  
  const ingredientesPrueba = useRef([]);
  const selectedOptionRef = useRef();

  //Generar PDF
  const generatePDF = async() => {
    const doc = new jsPDF();

    doc.addFont("helvetica", "normal");
    const fontSize = 10;

    const headers = [
      "#",
      "Nombre",
      "Precio",
      "Descripcion",
    ];
    const tableData = await Promise.all(
      products.map(async (product, index) => [
        index + 1,
        product.name,
        product.price,
        product.description,

      ])
    );

    doc.setFont("helvetica");
    doc.setFontSize(fontSize);
    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 40,
      styles: {
        textColor: [100, 100, 100],
        lineColor: [100, 100, 100],
        lineWidth: 0.1,
      },
      headStyles: {
        fillColor: [207, 41, 36],
        textColor: [255, 255, 255],
      },
      bodyStyles: {
        fillColor: [245, 245, 245],
      },
    });

    const imgData = Logo;
    doc.addImage(imgData, "PNG", 10, 10, 30, 30);

    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(`REPORTE DE PRODUCTOS`, 50, 25);

    const today = new Date();
    const dateStr = today.toLocaleDateString();

    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    doc.text(`Fecha: ${dateStr}`, 50, 30);

    doc.save("reporte_productos.pdf");
  };

  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState();
  const [notification, setNotification] = useState(null);


    // Variable para buscar productos


  useEffect(() => {
    const currentIngredients = ingredientes;
    const storedDetail = Cookies.get("orderDetail");
    if (storedDetail) {
      setOrder(JSON.parse(storedDetail));
    }
  }, [ingredientes]);

  const reloadDataTable = async () => {
    setProducts([]);
    setContents([]);
    setIngredientes([]);
    setIngredientes1([]);
    const res = await getProducts();
    const resContent = await getContents();
    setProducts(res.data);
    setContents(resContent.data);
  };

  const handleOptionChange = (event) => {
    const option = supplies.find(
      (supplie) => supplie.name === event.target.value,
    );
    selectedOptionRef.current = option;
  };

  const anadirIngrediente = () => {
    if (selectedOptionRef.current != undefined) {
      ingredientes.push(selectedOptionRef.current);
      setIngredientes([...ingredientes]); // Actualiza el estado de ingredientes
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
    reloadDataTable()
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
      col: "full",
      handleOptionChange: handleOptionChange,
      actionButton: anadirIngrediente,
    },
    {
      type : "list",
      columns: ['Nombre','Precio'],
      headers: ['name', 'price'],
      data: ingredientes,
      delete: true,
      //onDeleteClick: clickDelete
  },
  ];

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getProducts();
      const resContent = await getContents();
      setContents(resContent.data);
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
      // anadirIngrediente(data);
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
        formData1.append("product", produc.data.id);
        formData1.append("supplies", ingrediente.id);
        formData1.append("count", 1);

        await createContent(formData1);
      }

      reloadDataTable();
      setIngredientes([]);
      closeModal();
      setNotification({
        msg: "Producto creado exitosamente!",
        color: "success",
        buttons: false,
        timeout: 3000,
      });
    } catch (error) {
      console.error("Error al crear el Producto:", error);
    }
  };
  const datos = async (data) => {
    ingredientes1.append(data)
    await setIngredientes1([...ingredientes1])
  }
  const handleAddSupplies = () => {
    if (selectedOptionRef.current != undefined) {
      const res = selectedOptionRef.current
      const ingediente = {
        count: 1,
        products : "",
        supplies : res.id
      }
      ingredientes1.push(ingediente);
      setIngredientes1([...ingredientes1])
    } else {
      console.log("error al añadir");
    }
  };
  const handleEditClick = async (productId) => {
    const res = await getProduct(productId);
    const product = res.data;
    const content = contents.filter((content) => content.product == product.name)
    const Juntar = () => {
      const ingre = ingredientes1
      setIngredientes1([content, ...ingre])
    }

    Juntar()
    datos(content)
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
        type : "list",
        columns: ['Nombre'],
        headers: ['supplies'],
        data: ingredientes1,
        delete: true,
        //onDeleteClick: clickDelete
    },
    {
        title: "Ingredientes",
        hasButton: true,
        textButton: "+",
        type: "select",
        name: "supplies",
        icon: "list",
        required: "false",
        col : "full",
        customOptions: [{"name" : "no seleccionado", id : 0}, ...supplies],
        nameSelect:"name",
        keySelect: "id",
        handleOptionChange: handleOptionChange,
        actionButton: handleAddSupplies,
    },
    ];

    const handleEditProduct = async (data) => {
      console.log(data);
      const {id, name, price, image ,description } = data;
      const product = await (await getProduct(productId)).data;
      const contentss = contents.filter(
        (content) => content.product === product.name
      );

      try {


        // if (contentss.length > 0) {
        //   for (let i = 0; i < contentss.length; i++) {
        //     const content = contents[i];
        //     const updateContent = new FormData();
        //     updateContent.append("product", "burbuja");
        //     updateContent.append("supplies", content.supplies);
        //     updateContent.append("count", content.count);

        //     await editContent(content.id, updateContent);
        //   }
        // }

        if (ingredientes1.length > 0) {
          for (let i = 0; i < ingredientes1.length; i++) {
            const element = ingredientes1[i];
            const suppli = {
              product : product.id,
              supplies : element.supplies,
              count : element.count
            } 
            console.log(suppli);
            await createContent(suppli)
            
          }
        }
        const updateData = new FormData();
        updateData.append("name", data.name);
        updateData.append("price", data.price);
       // Agrega cada archivo individualmente
      for (let i = 0; i < data.image.length; i++) {
        updateData.append("image", data.image[i]);
      }

        updateData.append("description", data.description);

        const res = await editProduct(productId, updateData);
        const updatedProduct = res.data;

        if (contentss.length > 0) {
          for (let i = 0; i < contentss.length; i++) {
            const content = contents[i];
            const updateContent = new FormData();
            updateContent.append("product", id);
            updateContent.append("supplies", content.supplies);
            updateContent.append("count", content.count);

            await editContent(content.id, updateContent);
          }
        }

        closeModal();
        reloadDataTable();
        setNotification({
          msg: "Producto editado exitosamente!",
          color: "warning",
          buttons: false,
          timeout: 3000,
        });

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
      "name",
      true,
      handleEditProduct
    );
  };

  const handleAddclick = async (product) => {
    const suppliesProduct = await contents.filter(
      (content) => content.product == product.name
    );
    const content = contents.filter((content) => content.product == product.name)

    
    const fieldsAdd = [
      {
        title: "Producto",
        type: "text",
        name: "name",
        icon: "burger",
        col: "half",
        required: "true",
        value: product.name,
        readonly: true,
      },
      {
        title: "Precio",
        type: "number",
        name: "price",
        icon: "dollar",
        col: "half",
        required: "true",
        value: product.price,
        readonly: true,
      },
      {
        title: "Imagen",
        type: "image",
        name: "image",
        icon: "dollar",
        col: "full",
        image: product.image,
      },
      {
        title: "Descripción",
        type: "text",
        name: "description",
        icon: "comment",
        col: "full",
        required: "true",
        value: product.description,
        readonly: true,
      },
      {
        title: "Ingredientes",
        hasButton: true,
        textButton: "+",
        type: "select",
        name: "supplies",
        icon: "list",
        required: "false",
        col: "full",
        customOptions: [
          { id: 0, supplies: "No seleccionado" },
          ...suppliesProduct,
        ],
        nameSelect: "supplies",
        // handleOptionChange: handleOptionChange,
        actionButton: anadirIngrediente,
      },
      {
        type : "list",
        columns: ['Nombre','Precio'],
        headers: ['name', 'price'],
        data: ingredientes,
        delete: true,
        //onDeleteClick: clickDelete
    },
    ];

    const handleAdd = (data) => {
      const { name, price, description } = data;
      const idP = products.filter((product) => product.name == name);
      console.log(idP[0].id);
      try {
        const data2 = {
          id: idP[0].id,
          name,
          price,
          description,
          image: idP[0].image,
          supplies: content,
          amount: 1,
        };

        setOrder((prevOrder) => {
          Cookies.remove("orderDetail");
          const newOrder = [...prevOrder, data2];
          Cookies.set("orderDetail", JSON.stringify(newOrder));
          return newOrder;
        });

        closeModal();
        setNotification({
          msg: " El Producto fue añadido al Carrito!",
          color: "warning",
          buttons: false,
          timeout: 3000,
        });
      } catch (error) {
        console.log("Error al añadir a carito" + error);
      }
    };
    openModal(
      "Añadir al Carrito",
      fieldsAdd,
      [
        { id: 0, name: "No seleccionado", price: 0, stock: 0, status: true },
        ...supplies,
      ],
      "supplies",
      true,
      handleAdd
    );
  };

  const handleViewDetailsClicks = async (productId) => {
    const res = await getProduct(productId);
    const product = res.data;
    const suppliesProduct = await contents.filter(
      (content) => content.product == product.id
    );
    const content = contents.filter((content) => content.product == product.id)
    const B = []
    content.forEach(async conten => {
      const A = await getSupplie(conten.supplies)
      const {name} = A.data
      const C = {name , id : conten.supplies, count :conten.count}
      B.push(C)
    });

    const fieldsview = [
      {
        title: "Producto",
        type: "text",
        name: "name",
        icon: "burger",
        col: "half",
        required: "true",
        value: product.name,
        readonly: true,
      },
      {
        title: "Precio",
        type: "number",
        name: "price",
        icon: "dollar",
        col: "half",
        required: "true",
        value: product.price,
        readonly: true,
      },
      {
        title: "Imagen",
        type: "image",
        name: "image",
        icon: "dollar",
        col: "full",
        image: product.image,
      },
      {
        title: "Descripción",
        type: "text",
        name: "description",
        icon: "comment",
        col: "full",
        required: "true",
        value: product.description,
        readonly: true,
      },
      {
        type : "list",
        columns: ['Nombre'],
        headers: ['name'],
        data: B,
        delete: false,
        //onDeleteClick: clickDelete
    },
    ];

    openModal("Ver producto", fieldsview, products, "status", false);
  };

  const handleStatusChange = async (productId, status) => {
        try {
          await updateProductStatus(productId, !status);
          setNotification({
            msg: "Estado cambiado exitosamente!",
            color: "info",
            buttons: false,
            timeout: 3000,
          });

        } catch (error) {
          console.error(error);
        }
      };

  const handleDeleteClick = async (productId) => {
    setNotification({
      msg: "¿Seguro deseas eliminar el Producto?",
      color: "warning",
      buttons: true,
      timeout: 0,
      onConfirm: async () => {
        try{
          await deleteProduct(productId);
          setNotification({
            msg: "Producto eliminado exitosamente!",
            color: "info",
            buttons: false,
            timeout: 3000,
          });
          reloadDataTable();

        }catch{
          console.error("Error al eliminar:");
        }
     },
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
      <div className="notifications float">
          {notification && (
            <Notification
              msg={notification.msg}
              color={notification.color}
              buttons={notification.buttons}
              timeout={notification.timeout}
              onClose={() => setNotification(null)}
              onConfirm={notification.onConfirm}
            />
          )}
        </div>
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
                  [
                    {
                      id: 0,
                      name: "No seleccionado",
                      price: 0,
                      stock: 0,
                      status: true,
                    },
                    ...supplies,
                  ],
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
          <Button
              text="Generar PDF"
              color="primary"
              col="fullwidth"
              action={generatePDF}
            />

          </div>
        </div>
        <ViewP
          onStatusClick={handleStatusChange}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
          onViewDetails={handleViewDetailsClicks}
          onAdd={handleAddclick}
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