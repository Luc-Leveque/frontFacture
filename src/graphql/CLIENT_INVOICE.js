import { gql } from '@apollo/client'

const CLIENT_INVOICE = gql`
  query getClientInvoice($idClient: ID!) {
    clientInvoice(id: $idClient) {
      id
      description
      pdf
      status
    }
  }
`

export default CLIENT_INVOICE
