import { gql } from '@apollo/client'

const UPDATE_USER = gql`
  mutation updateUserById(
    $idUser: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $societe: String!
    $codePostal: String!
    $ville: String!
    $adresse: String!
  ) {
    updateUser(
      id: $idUser
      firstName: $firstName
      lastName: $lastName
      email: $email
      societe: $societe
      codePostal: $codePostal
      ville: $ville
      adresse: $adresse
    ) {
      id
    }
  }
`

export default UPDATE_USER
