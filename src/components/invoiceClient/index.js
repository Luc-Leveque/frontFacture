import { useQuery } from '@apollo/client'
import Link from 'next/link'
import PropTypes from 'prop-types'
import CLIENT_INVOICE from '../../graphql/CLIENT_INVOICE'

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
        <table>
          <thead>
            <tr>
              <th>description</th>
              <th>pdf</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {clientInvoiceList.map(invoice => (
              <tr key={invoice.id}>
                <td>
                  <a>{invoice.description}</a>
                </td>
                <td>
                  <a>{invoice.pdf}</a>
                </td>
                <td>
                  <a>{invoice.status}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

InvoiceClient.propTypes = {
  idClient: PropTypes.string
}

export default InvoiceClient
