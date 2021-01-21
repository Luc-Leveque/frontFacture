import { useRouter } from 'next/router'
import InvoiceClient from '../../../components/invoiceClient'
import Footer from '../../../components/footer'
import Header from '../../../components/header'
import styles from '../../../styles/Home.module.css'

const ListInvoiceClient = () => {
  const router = useRouter()
  const { idClient } = router.query

  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        <div>
          <InvoiceClient idClient={idClient} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default ListInvoiceClient
