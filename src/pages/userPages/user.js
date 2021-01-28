import { useQuery } from '@apollo/client'
import GET_USER from '../../graphql/GET_USER'
import UpdateUser from '../../components/updateUser'
import Header from '../../components/header'

const User = () => {
  const idUser = '601295d3b376a13408e72b9f'
  const { data, loading, error } = useQuery(GET_USER, { variables: { idUser } })

  if (error) return <div>Error loading User.</div>
  if (loading) return <div>Loading</div>

  const { getUser: user } = data

  return (
    <>
      <Header />
      <UpdateUser user={user} />
    </>
  )
}

export default User
