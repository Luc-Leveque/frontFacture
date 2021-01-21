import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'
import CLIENT_QUERY from '../../../graphql/CLIENT_QUERY'
import AddClient from '../../../components/addClient'

const Client = () => {
  const router = useRouter()
  const { idClient } = router.query

  const { data, loading, error } = useQuery(CLIENT_QUERY, {
    variables: { idClient }
  })

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { getClientById: client } = data

  return <AddClient client={client} />
}

export default Client
