import { gql } from '@apollo/client'

const CLIENT_INVOICE = gql`
  query getClientInvoice($idClient: ID!) {
    clientInvoice(id: $idClient) {
      id
      status
      description
      date
    }
  }
`

export default CLIENT_INVOICE
