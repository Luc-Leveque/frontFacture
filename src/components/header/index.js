import React from 'react'
import NavBar from '../navBar'
import Head from 'next/head'

// styles

const Header = () => {
  return (
    <div>
      <Head>
        <title>Invoice App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />
    </div>
  )
}

export default Header
