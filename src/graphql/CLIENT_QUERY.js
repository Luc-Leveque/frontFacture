import { gql } from '@apollo/client'

const CLIENT_QUERY = gql`
  query getClientDetail($idClient: ID!) {
    getClientById(id: $idClient) {
      id
      name
      siret
      address
      email
      phoneNumber
    }
  }
`

export default CLIENT_QUERY
