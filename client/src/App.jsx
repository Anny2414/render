import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UsersPage } from "./pages/UsersPage";
import { Navbar } from "./components/Navbar.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/" />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
