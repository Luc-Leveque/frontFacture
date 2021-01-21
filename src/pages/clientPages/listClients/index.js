import Head from 'next/head'
import styles from '../../../styles/Home.module.css'
import ClientList from '../../../components/clientList/index'
import AddClient from '../../../components/addClient/index'
import Header from '../../../components/header'
import Footer from '../../../components/footer'

const ListClients = () => {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div>
          <ClientList />
        </div>
        <AddClient />
      </main>

      <Footer />
    </div>
  )
}

export default ListClients
