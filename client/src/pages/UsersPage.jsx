import { Navbar } from "../components/Navbar.jsx";
import { Table } from "../components/Table/Table.jsx"

export function UsersPage() {
  return (
    <div>
      <Navbar />
      <Table headers={['ID', 'Rol', 'Usuario', 'Correo', 'Registro', 'Estado']} showPdfButton={true} showAdminButton={false} />
    </div>);
}
