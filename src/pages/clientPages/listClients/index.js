import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import ClientList from '../../../components/clientList/index'
import AddClient from '../../../components/addClient/index'
import NavBar from '../../../components/navBar'

const ListClients = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Invoice App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <NavBar />

      <main className={styles.main}>
        <div>
          <h1 style={{ textAlign: 'center' }}>Clients</h1>
          <ClientList />
        </div>
        <AddClient />
      </main>

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

export default ListClients
