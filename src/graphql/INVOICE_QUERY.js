import { gql } from '@apollo/client'

const INVOICE_QUERY = gql`
  query getInvoice($idInvoice: ID!) {
    getInvoiceById(id: $idInvoice) {
      id
      products {
        title
        price
        qte
      }
      date
      status
      description
    }
  }
`

export default INVOICE_QUERY
