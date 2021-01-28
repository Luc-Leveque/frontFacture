import { gql } from '@apollo/client'

const UPDATE_INVOICE = gql`
  mutation updateInvoiceById(
    $idInvoice: ID!
    $status: String!
    $description: String!
    $date: String!
    $data: [InvoiceInput!]!
  ) {
    updateInvoice(
      idInvoice: $idInvoice
      status: $status
      description: $description
      date: $date
      data: $data
    ) {
      id
      status
    }
  }
`

export default UPDATE_INVOICE
