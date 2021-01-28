import { gql } from '@apollo/client'

const GET_USER = gql`
  query getUserById($idUser: ID!) {
    getUser(id: $idUser) {
      id
      firstName
      lastName
      email
      societe
      codePostal
      ville
      adresse
    }
  }
`

export default GET_USER
