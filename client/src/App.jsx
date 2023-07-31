import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";
import { HomePage } from "./pages/HomePage";
import { RolePage } from "./pages/RolePage";
import { SalesPage } from "./pages/SalesPage";
import { SalePage } from "./pages/SalePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ClientPage } from "./pages/ClientPage";
import { SuppliesPage } from "./pages/Supplies";
import { OrderPage } from "./pages/OrderOnePage";
import { OrdersPage } from "./pages/OrdersPage";  
import { Loginpage } from "./pages/Loginpage"; 
import { Registropage } from "./pages/registropage";
import {PasswordResetForm} from "./pages/PasswordResetForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/registro" element={<Registropage/>} />
        <Route path="/recuperar" element={<PasswordResetForm/>}/>
        <Route path="/login" element={<Loginpage/>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/sale" element={<SalePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/clients" element={<ClientPage />} />
        <Route path="/supplies" element={<SuppliesPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;
