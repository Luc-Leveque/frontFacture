import { gql, useQuery } from '@apollo/client'
import Link from 'next/link'
import ALL_CLIENTS_QUERY from '../../graphql/ALL_CLIENTS_QUERY'
import DeleteClient from '../deleteClient'
import styled from 'styled-components'
import { Table, Button } from 'react-bootstrap'

const ClientList = () => {
  const { loading, error, data } = useQuery(ALL_CLIENTS_QUERY)

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { getClients: allClients } = data

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Clients</h1>
      <Table striped bordered hover>
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
              <td className='align-middle'>{client.name}</td>
              <td className='align-middle'>{client.siret}</td>
              <td className='align-middle'>{client.address}</td>
              <td className='align-middle'>{client.email}</td>
              <td className='align-middle'>{client.phoneNumber}</td>
              <Link
                href={`/clientPages/client/${encodeURIComponent(client.id)}`}
              >
                <td className='align-middle'>
                  <Button variant='secondary'> Màj Client</Button>
                </td>
              </Link>
              <Link
                href={`/invoicePages/listInvoiceClient/${encodeURIComponent(
                  client.id
                )}`}
              >
                <td className='align-middle'>
                  <Button>Liste Facture</Button>
                </td>
              </Link>
              <td>
                <DeleteClient idClient={client.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

ClientList.defaultProps = {
  allClients: []
}

export default ClientList
