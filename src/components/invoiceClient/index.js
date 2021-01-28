import { useQuery } from '@apollo/client'
import Link from 'next/link'
import PropTypes from 'prop-types'
import CLIENT_INVOICE from '../../graphql/CLIENT_INVOICE'
import { Table, Button } from 'react-bootstrap'

const InvoiceClient = ({ idClient }) => {
  const { data, loading, error } = useQuery(CLIENT_INVOICE, {
    variables: { idClient }
  })

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { clientInvoice: clientInvoiceList } = data

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Liste des Factures</h1>
      {!clientInvoiceList.length ? (
        <div>Aucune facture pour ce client</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>description</th>
              <th>status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {clientInvoiceList.map(invoice => (
              <tr key={invoice.id}>
                <td>{invoice.description}</td>
                <td>{invoice.status}</td>
                <td>{invoice.date}</td>
                <Link
                  href={`/invoicePages/addFacture/${encodeURIComponent(
                    idClient
                  )}?idInvoice=${encodeURIComponent(invoice.id)}`}
                >
                  <Button variant='secondary'>Modifier la facture</Button>
                </Link>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  )
}

InvoiceClient.propTypes = {
  idClient: PropTypes.string
}

export default InvoiceClient
