import React from 'react'
import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'

// styles

const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Nav className='mr-auto navInvoice'>
        <Nav className='eltInvoiceNav'>
          <Link href='/clientPages/listClients'>Répertoire Client</Link>
        </Nav>
        <Nav className='eltInvoiceNav'>
          <Link href='/userPages/user'>User</Link>
        </Nav>
      </Nav>
    </Navbar>
  )
}

export default NavBar
