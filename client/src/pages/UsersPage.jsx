import { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar.jsx';
import { getData } from '../api/users.api';
import { TableBar } from '../components/Table/TableBar.jsx';
import { Table } from '../components/Table/Table.jsx';
import { BaseModal } from '../components/BaseModal.jsx';

export function UsersPage() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([])

  // Objeto para los campos de la ventana modal
  const fields = [
    { title: 'Usuario', type: 'text', name: 'usuario', icon: 'user', col: 'half' },
    { title: 'Email', type: 'text', name: 'email', icon: 'envelope', col: 'half' },
    { title: 'Contraseña', type: 'password', name: 'contrasena', icon: 'key', col: 'half', disabled: 'true' },
    { title: 'Rol', type: 'select', name: 'role', col: 'half'}
  ]

  // Conexion a API y obtiene datos de Users y Roles
  useEffect(() => {
    async function fetchData() {
      const res = await getData('users');
      const resRoles = await getData('roles')
      setUsers(res.data);
      setRoles(resRoles.data)
    }

    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='container is-fluid mt-5'>
        <TableBar showPdfButton={true} />
        <Table
          headers={['id', 'role', 'username', 'email', 'date']}
          columns={['ID', 'Rol', 'Usuario', 'Correo', 'Creado en']}
          data={users}
        />
        <BaseModal fields={fields} data={roles} />
      </div>
    </div>
  );
}
