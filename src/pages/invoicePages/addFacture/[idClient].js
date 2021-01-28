import React from 'react'

import { useRouter } from 'next/router'
import { useQuery } from '@apollo/client'

import INVOICE_QUERY from '../../../graphql/INVOICE_QUERY'

import AddInvoice from '../../../components/addInvoice'

const AddFacture = () => {
  const router = useRouter()
  const { idInvoice, idClient } = router.query

  const { data, loading, error } = useQuery(INVOICE_QUERY, {
    variables: { idInvoice }
  })

  if (error) return <AddInvoice idClient={idClient} />
  if (loading) return <div>Loading</div>

  const { getInvoiceById: invoice } = data

  return <AddInvoice idClient={idClient} invoice={invoice} />
}

export default AddFacture
