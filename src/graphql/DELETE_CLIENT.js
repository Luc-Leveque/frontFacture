import { gql } from '@apollo/client'

const DELETE_CLIENT = gql`
  mutation deleteClientById($idClient: ID!) {
    deleteClient(id: $idClient) {
      address
    }
  }
`

export default DELETE_CLIENT
