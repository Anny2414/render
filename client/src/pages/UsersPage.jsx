import { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar.jsx";
import { getData } from "../api/users.api";
import { TableBar } from "../components/Table/TableBar.jsx"
import { Table } from "../components/Table/Table.jsx"

export function UsersPage() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await getData("users")
      setUsers(res.data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <TableBar showPdfButton={true} />
        <Table headers={['id', 'role', 'username', 'email', 'date']} data={users} />
      </div>
    </div>);
}
