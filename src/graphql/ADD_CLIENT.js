import { gql } from '@apollo/client'

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $siret: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
  ) {
    createClient(
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

export default ADD_CLIENT
