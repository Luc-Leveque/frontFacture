import { gql } from '@apollo/client'

const ALL_CLIENTS_QUERY = gql`
  query allClients {
    getClients {
      id
      name
      siret
      address
      email
      phoneNumber
    }
  }
`
export default ALL_CLIENTS_QUERY
