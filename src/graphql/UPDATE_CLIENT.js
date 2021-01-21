import { gql } from '@apollo/client'

const UPDATE_CLIENT = gql`
  mutation updateClientById(
    $idClient: ID!
    $name: String!
    $siret: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
  ) {
    updateClient(
      id: $idClient
      name: $name
      siret: $siret
      address: $address
      email: $email
      phoneNumber: $phoneNumber
    ) {
      id
      name
      siret
      email
      phoneNumber
      address
    }
  }
`

export default UPDATE_CLIENT
