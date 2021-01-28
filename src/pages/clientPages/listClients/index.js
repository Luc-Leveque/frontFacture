import styles from '../../../styles/Home.module.css'
import ClientList from '../../../components/clientList/index'
import AddClient from '../../../components/addClient/index'
import Header from '../../../components/header'
import Footer from '../../../components/footer'

const ListClients = () => {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <ClientList />

          <AddClient />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default ListClients
