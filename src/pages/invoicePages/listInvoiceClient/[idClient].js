import { useRouter } from 'next/router'
import InvoiceClient from '../../../components/invoiceClient'
import styled from 'styled-components'
import Footer from '../../../components/footer'
import Header from '../../../components/header'
import styles from '../../../styles/Home.module.css'

import Link from 'next/link'

const ListInvoiceClient = () => {
  const router = useRouter()
  const { idClient } = router.query

  return (
    <>
      <Header />
      <div className={styles.container}>
        <main className={styles.main}>
          <div>
            <InvoiceClient idClient={idClient} />
          </div>
          <div>
            {' '}
            <Link
              href={`/invoicePages/addFacture/${encodeURIComponent(idClient)}`}
            >
              <Button>Ajouter une facture pour ce client</Button>
            </Link>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export default ListInvoiceClient
