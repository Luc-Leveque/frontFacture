import { gql, useQuery } from '@apollo/client'

export const ALL_CLIENTS_QUERY = gql`
  query allClients {
    getClients {
      id
      name
    }
  }
`

export default function ClientList() {
  const { loading, error, data } = useQuery(ALL_CLIENTS_QUERY)

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { getClients: allClients } = data

  return (
    <div>
      {allClients.map(client => (
        <div key={client.id}> {client.name} </div>
      ))}
    </div>
  )
}
