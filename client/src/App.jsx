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




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
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
