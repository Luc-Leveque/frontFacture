import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styled from 'styled-components'

// styles

const NavBar = () => {
  return (
    <NavBars>
      <div className='logo'>
        <Link href='/'>
          <Image src='/logo.png' width='100px' height='100px' alt='Image' />
        </Link>
      </div>
      <link__menu>
        <item__menu>
          <li>
            <item__menu>
              <li>
                <Link href='/clientPages/listClients'>Répertoire Client</Link>
              </li>
              <li>
                <Link href='/invoicePages/listClients'>Liste Utilisateur</Link>
              </li>
              <li>
                <Link href='/favoritePage'>Liste facture</Link>
              </li>
            </item__menu>
          </li>
        </item__menu>
      </link__menu>
    </NavBars>
  )
}

const NavBars = styled.div`
  display: flex;
  padding: 50px;
`

const link__menu = styled.div`
  display: flex;
  padding: 50px;
`
const item__menu = styled.ul`
  display: flex;
  padding: 50px;
`

export default NavBar
