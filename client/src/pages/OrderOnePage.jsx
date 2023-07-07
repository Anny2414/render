import { useEffect, useState, useRef } from "react";
import '../assets/css/OrderPage.css'
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar.jsx";
import { Button } from "../components/Form/Button";
import Cookies from "js-cookie";
import { Detalle } from "../components/Detalle";
import { Info } from "../components/Info";
import { ModalSale } from "../components/modal.sale";
import { getContent, getContents } from "../api/content.api";
import { getSupplies } from "../api/supplies.api";
import { getUsers } from "../api/users.api";
import {createOrder,deleteOrder,editOrder,getOrder,getOrders} from "../api/order.api"
import { createDetail } from "../api/detail.api";
import { createContentO } from "../api/contentdetail.api";

export function OrderPage() {
    const [products, setProducts] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [modalConfig, setModalConfig] = useState();
    const [ingredientes, setIngredientes] = useState([]);
    const [supplies, setSupplies] = useState([]);
    const [contents , setContents] = useState([])
    const [detail, setDetail] = useState([])
    const [total, setTotal] = useState(0);
  
    useEffect(() => {
      const calculateTotal = () => {
        let sum = 0;
        products.forEach((product) => {
            const tota = parseInt(product.price) * parseInt(product.amount)
          sum += tota || 0 ;
        });
        setTotal(sum);
      };
  
      calculateTotal();
    }, [products]);
    // const ingredientes = useRef([]);
    const selectedOptionRef = useRef();
    const a = [];
    const num = (number) => {
        a.push(number);

    }
    const delet = () => {
        a.length = 0;

    }
    useEffect(() =>{
        const ingredient = ingredientes
        setDetail(ingredient)
    })
    useEffect(() => {
        const currentIngredients = ingredientes;
        const fech = async() => {
            const content = await getContents()
            const supplie = await getSupplies()
            setSupplies(supplie.data)
            setContents(content.data)
        }
        fech()
      }, [ingredientes]);
    

    useEffect(() => {
        const getStoredDetail = () => {
            const storedDetail = Cookies.get("orderDetail");
            if (storedDetail) {
                setProducts(JSON.parse(storedDetail));
            }
        };
        getStoredDetail();
    }, []);

    const handleOptionChange = (event) => {
        console.log("entra");
        const option = supplies.find(
          (supplie) => supplie.name === event.target.value
        );
        selectedOptionRef.current = option;
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

    const reloadDataTable = async () => {
        setProducts([]);
        const storedDetail = Cookies.get("orderDetail");
        if (storedDetail) {
            setProducts(JSON.parse(storedDetail));
        }
    };
    const submitButton = async (data) => {
        try {
            const users = (await getUsers()).data;
            const user = users[0];
            const orderData = { user: user.username, total: total, status: "Pago" };
            const respOrder = await createOrder(orderData);
        
            const formDataDetails = [];
        
            for (let i = 0; i < products.length; i++) {
              const product = products[i];
              
        
              const formDataDetail = new FormData();
              formDataDetail.append("order", respOrder.data.id);
              formDataDetail.append("product", product.name);
              formDataDetail.append("amount", product.amount);
              formDataDetail.append("price", product.price);
              formDataDetail.append("contentOrder", product.supplies);
                const order = {
                    order: respOrder.data.id,
                    product: product.name,
                    amount
                }
              formDataDetails.push(formDataDetail);
            }
        
            const createdDetails = [];
            console.log(formDataDetails);
        
            for (const formDataDetail of formDataDetails) {
              const respDetail = await createDetail(formDataDetail);
              createdDetails.push(respDetail.data);
        
              const contentOrder = formDataDetail.get("contentOrder");
                console.log(contentOrder);
              for (const content of contentOrder) {
                console.log(content);
                const formData = new FormData();
                formData.append("detail", respDetail.data.id);
                formData.append("supplies", content.name);
        
                await createContentO(formData);
              }
            }
        
            setDetail([]);
            setIngredientes([]);
            Cookies.remove("orderDetail");
          } catch (error) {
            console.error("Error al crear el pedido:", error);
          }
    }

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


    const EditP = async (product) => {
        const anadirIngrediente = () => {
            setIngredientes([])
            const ingredien = product.supplies.filter((supplie) => supplie.name == ingredientes.name )
            console.log(product.supplies);
            if (selectedOptionRef.current != undefined) {
                ingredientes.push(selectedOptionRef.current);
                 setIngredientes([...ingredientes]); // Actualiza el estado de ingredientes
            const storedDetail = Cookies.get("orderDetail");
            if (storedDetail) {
              const orderDetail = JSON.parse(storedDetail);
              const updatedOrderDetail = orderDetail.map((producto) => {
                if (producto.id === producto.id) {
                  // Verificar si el ingrediente ya existe en product.supplies
                  const ingredien = producto.supplies.some(
                    (supplie) => supplie.name === selectedOptionRef.current.name
                  );
                  if (!ingredien) {
                    producto.supplies.push(selectedOptionRef.current);
                    // Actualizar el estado de products
                    setProducts([...orderDetail]);
                product.supplies.push(selectedOptionRef.current)

                  }
                }
                return product;
              });
              Cookies.set("orderDetail", JSON.stringify(updatedOrderDetail));
            }

              
            } else {
              console.log("error al añadir");
            }
          };
          const clickDelete = (ingredientId) => {
            const storedDetail = Cookies.get("orderDetail");
            if (storedDetail) {
              const orderDetail = JSON.parse(storedDetail);
              const updatedOrderDetail = orderDetail.map((product) => {
                if (product.id === product.id) {
                  // Filtrar los ingredientes y eliminar el que coincida con ingredientId
                  product.supplies = product.supplies.filter(
                    (supplie) => supplie.id !== ingredientId
                  );
                  // Actualizar el estado de products
                  setProducts([...orderDetail]);
                  // Actualizar la cookie
                  Cookies.set("orderDetail", JSON.stringify(updatedOrderDetail));
                  // Volver a obtener los datos de la cookie y actualizar los estados
                  reloadDataTable();
                }
                return product;
              });
            }
          };
          

        setIngredientes([])
        console.log(product);
        const ingredient = product.supplies
        console.log(ingredient);
        const content = contents.filter((content) => content.product == product.name)
        console.log(content);
        
        const FieldsEdit = [
            {
                type : "list",
                columns: ['name'],
                headers: ['name'],
                data: ingredient,
                delete: true,
                onDeleteClick: {clickDelete}
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
                customOptions: [{"supplies" : "no seleccionado"}, ...content],
                nameSelect:"supplies",
                keySelect: "supplies",
                handleOptionChange: handleOptionChange,
                actionButton: anadirIngrediente,
            }
        ]

        const submitEditar = () => {
            closeModal()
        }

        openModal("Editar ingredientes",FieldsEdit,content,"supplies",true,submitEditar)
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
                        EditP={EditP}
                    />




                </div>
                <div className="column is-one-third">
                    {/* <Info
                        products={products}
                        submitButton={submitButton}
                        reload={reloadDataTable}
                    /> */}


<div className="card card-info">
        <div className="card-header px-2">
          <h1>Detalle</h1>
          <div className="hr"></div>
        </div>
        <div className="card-content p-6">
          {products.map((product) => (
            <div className="mb-3" key={product.id}>
              <div className="is-flex ">
                <div className="producto">
                  <p>{product.name}</p>
                </div>
                <div className="valor">
                  <p>{product.price}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="mb-3">
            <div className="is-flex ">
              <div className="producto">
                <p>IVA</p>
              </div>
              <div className="valor">
                <p></p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="is-flex ">
              <div className="producto">
                <p>Envio</p>
              </div>
              <div className="valor">
                <p></p>
              </div>
            </div>
          </div>
          <div className="mb-3">
            <div className="is-flex ">
              <div className="producto">
                <p>subtotal</p>
              </div>
              <div className="valor">
                <p></p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer ">
          <div className="mb-3 p-6">
            <div className="is-flex">
              <div className="producto">
                <h2>Total</h2>
              </div>
              <div className="valor">
                <h2>{total}</h2>
              </div>
            </div>
          </div>
          <div className="is-flex is-full">
            <div className="m-auto pb-5">
              <Button
                text="Cancelar"
                color="primary"
                action={() => {
                  Cookies.remove("orderDetail");
                  reload()
                }}
              />
              <Button
              text= "Comprar"
              color= "success ml-3"
              action = {submitButton}
              />
             
            </div>
          </div>
        </div>
      </div>
                </div>
            </div>
        </div>
        {isOpen && (
            <ModalSale
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
}