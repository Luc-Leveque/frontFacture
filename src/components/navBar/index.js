import React from 'react'
import Link from 'next/link'
import { Nav, Navbar } from 'react-bootstrap'

// styles

const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Nav className='mr-auto'>
        <Nav.Link>
          <Link href='/clientPages/listClients'>Répertoire Client</Link>
        </Nav.Link>
        <Nav.Link>
          <Link href='/userPages/user'>User</Link>
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}

export default NavBar
