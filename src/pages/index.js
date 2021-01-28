import styles from '../styles/Home.module.css'
import ClientList from '../components/clientList/index'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div>
            <ClientList />
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}
