import React from 'react'
import { Navbar } from '../components/Navbar'
import { Table } from '../components/Table/Table.jsx'

export function RolePage() {
  return (
    <div>
        <Navbar />
        <Table showPdfButton={false}/>
    </div>
  )
}