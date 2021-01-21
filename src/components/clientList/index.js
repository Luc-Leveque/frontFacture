import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import ALL_CLIENTS_QUERY from '../../graphql/ALL_CLIENTS_QUERY'
import DeleteClient from '../deleteClient'

const ClientList = () => {
  const { loading, error, data } = useQuery(ALL_CLIENTS_QUERY)

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { getClients: allClients } = data

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>siret</th>
            <th>address</th>
            <th>email</th>
            <th>phoneNumber</th>
          </tr>
        </thead>
        <tbody>
          {allClients.map(client => (
            <tr key={client.id}>
              <td>
                <a>{client.name}</a>
              </td>
              <td>
                <a>{client.siret}</a>
              </td>
              <td>
                <a>{client.address}</a>
              </td>
              <td>
                <a>{client.email}</a>
              </td>
              <td>
                <a>{client.phoneNumber}</a>
              </td>
              <Link
                href={`/clientPages/client/${encodeURIComponent(client.id)}`}
              >
                <td> Mettre à jour le Client</td>
              </Link>
              <Link
                href={`/invoicePages/listInvoiceClient/${encodeURIComponent(
                  client.id
                )}`}
              >
                <td> Facture</td>
              </Link>
              <td>
                <DeleteClient idClient={client.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

ClientList.defaultProps = {
  allClients: []
}

export default ClientList
