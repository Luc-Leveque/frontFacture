import React from 'react'
import styles from '../../styles/Home.module.css'
import NavBar from '../navBar'
import Head from 'next/head'

// styles

const Footer = () => {
  return (
    <div>
      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Footer
