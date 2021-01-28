import { gql } from '@apollo/client'

const ADD_INVOICE = gql`
  mutation addInvoice(
    $idClient: ID!
    $status: String!
    $description: String!
    $date: String!
    $data: [InvoiceInput!]!
  ) {
    createInvoice(
      idClient: $idClient
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

export default ADD_INVOICE
