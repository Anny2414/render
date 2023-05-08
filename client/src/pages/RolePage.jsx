import {React, useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { getData } from "../api/users.api";
import { Table } from '../components/Table/Table.jsx'
import { TableBar } from '../components/Table/TableBar.jsx'

export function RolePage() {
  const [roles, setRoles] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await getData("roles")
      setRoles(res.data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container is-fluid mt-5">
        <TableBar showPdfButton={false} />
        <Table headers={['id', 'name', 'created_at']} data={roles} />
      </div>
    </div>
  )
}