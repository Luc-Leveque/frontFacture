import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

import Header from '../../components/header'

import { useMutation, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Form, Container } from 'react-bootstrap'

import ADD_INVOICE from '../../graphql/ADD_INVOICE'
import UPDATE_INVOICE from '../../graphql/UPDATE_INVOICE'
import CLIENT_INVOICE from '../../graphql/CLIENT_INVOICE'
import INVOICE_QUERY from '../../graphql/INVOICE_QUERY'
import GET_USER from '../../graphql/GET_USER'

const GeneratePDF = dynamic(() => import('../../components/GeneratePDF'), {
  ssr: false
})

const AddInvoice = ({ idClient, invoice = false }) => {
  const ref = React.useRef()

  const idUser = '601295d3b376a13408e72b9f'
  const { data, loading, error } = useQuery(GET_USER, { variables: { idUser } })

  const idInvoice = invoice.id || false
  const today = new Date(),
    date =
      today.getDate() +
      '/' +
      ('0' + (today.getMonth() + 1)).slice(-2) +
      '/' +
      ('0' + today.getFullYear()).slice(-2)

  const [totalPriceInvoice, setTotalPriceInvoice] = useState(0)
  const [formState, setformState] = useState(
    invoice
      ? {
          inputs: exportInitArray(invoice.products),
          date: invoice.date,
          status: invoice.status,
          description: invoice.description
        }
      : {
          inputs: [],
          date: date,
          status: '',
          description: ''
        }
  )

  function exportInitArray(data) {
    return data.map((item, index) => ({
      key: index,
      title: item.title,
      price: item.price,
      qte: item.qte
    }))
  }

  const appendInput = () => {
    const newInput = {
      key: formState.inputs.length,
      title: '',
      price: 0,
      qte: 0
    }
    const temp = formState.inputs
    temp.push(newInput)

    setformState({ ...formState, inputs: temp })
  }

  const delInput = () => {
    const temp = formState.inputs
    temp.pop()

    setformState({ ...formState, inputs: temp })
  }

  const changeTotal = () => {
    let total = 0
    formState.inputs.map(input => (total += input.price * input.qte))
    setTotalPriceInvoice(total)
  }

  const [addInvoice] = useMutation(ADD_INVOICE)

  const [updateInvoiceById] = useMutation(UPDATE_INVOICE)
  const router = useRouter()

  useEffect(() => {
    changeTotal()
  }, [formState])

  if (error) return <div>Error loading User.</div>
  if (loading) return <div>Loading</div>
  const { getUser: user } = data

  return (
    <div>
      <Header />

      <div className='invoice-box' ref={ref}>
        <div className='top'>
          <img id='imageInvoice' src='/logo.png' width='200' height='150' />{' '}
          <div id='aze'>
            Facture N° #: 123 <br /> Date :{' '}
            <Input
              type='text'
              id='inputDateInvoice'
              placeholder='Date'
              required='required'
              value={formState.date}
              onChange={e =>
                setformState({ ...formState, date: e.target.value })
              }
            />
          </div>
        </div>
        <div className='top'>
          <div>
            {user.societe}
            <br /> {user.codePostal}
            {'-'}
            {user.ville}
            <br /> {user.adresse}
          </div>
          <div>
            {user.societe}
            <br /> {user.firstName} {'-'}
            {user.lastName}
            <br /> {user.email}
          </div>
        </div>
        <table id='tableautoTest' cellPadding='0' cellSpacing='0'>
          <tr className='heading'>
            <td>Produit</td>
            <td>Prix à l'unité</td>
            <td>Quantité</td>
            <td>Total HT</td>
            <td>TVA</td>
            <td>Total TTC</td>
          </tr>

          {formState.inputs.map((input, index) => (
            <tr key={index} className='item'>
              <td>
                <input
                  value={input.title}
                  onChange={e => {
                    let newArr = [...formState.inputs]
                    newArr.map(item => {
                      if (item.key === input.key) {
                        item.title = e.target.value
                      }
                    })
                    setformState({ ...formState, inputs: newArr })
                  }}
                />
              </td>
              <td>
                <input
                  type='number'
                  value={input.price}
                  onChange={e => {
                    let newArr = [...formState.inputs]
                    newArr.map(item => {
                      if (item.key === input.key) {
                        item.price = parseInt(e.target.value)
                      }
                    })
                    setformState({ ...formState, inputs: newArr })
                  }}
                />{' '}
                €
              </td>
              <td>
                <input
                  type='number'
                  value={input.qte}
                  onChange={e => {
                    let newArr = [...formState.inputs]
                    newArr.map(item => {
                      if (item.key === input.key) {
                        item.qte = parseInt(e.target.value)
                      }
                    })
                    setformState({ ...formState, inputs: newArr })
                  }}
                />
              </td>
              <td>{input.qte * input.price} €</td>
              <td>20%</td>
              <td>{(input.qte * input.price * 1.2).toFixed(2)} €</td>
            </tr>
          ))}

          <tr>
            <td colSpan='4'>
              <button onClick={() => appendInput()} className='btn-add-row'>
                Add row
              </button>
              <button onClick={() => delInput()} className='btn-add-row'>
                Delete Last row
              </button>
            </td>
          </tr>

          <tr className='total'>
            <td colSpan='3'></td>

            <td>Total HT : {totalPriceInvoice} €</td>
            <td>TVA : 20%</td>
            <td>Total TTC : {(totalPriceInvoice * 1.2).toFixed(2)}€</td>
          </tr>
        </table>
      </div>
      <Container>
        <Form
          onSubmit={e => {
            e.preventDefault()
            if (invoice) {
              updateInvoiceById({
                variables: {
                  idInvoice: invoice.id,
                  status: formState.status,
                  description: formState.description,
                  date: formState.date,
                  data: formState.inputs.map(item => ({
                    title: item.title,
                    price: item.price,
                    qte: item.qte
                  }))
                },
                refetchQueries: [
                  { query: INVOICE_QUERY, variables: { idInvoice } }
                ]
              })
              router.push(
                `/invoicePages/listInvoiceClient/${encodeURIComponent(
                  idClient
                )}`
              )
            } else {
              addInvoice({
                variables: {
                  idClient: idClient,
                  status: formState.status,
                  description: formState.description,
                  date: formState.date,
                  data: formState.inputs.map(item => ({
                    title: item.title,
                    price: item.price,
                    qte: item.qte
                  }))
                },
                refetchQueries: [
                  { query: CLIENT_INVOICE, variables: { idClient } }
                ]
              })
              router.push(
                `/invoicePages/listInvoiceClient/${encodeURIComponent(
                  idClient
                )}`
              )
            }
          }}
        >
          <Form.Group>
            <Form.Label>Status Facture</Form.Label>
            <Form.Control
              type='text'
              placeholder='Status'
              id='statusInvoiceForm'
              required='required'
              value={formState.status}
              onChange={e =>
                setformState({ ...formState, status: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description Facture</Form.Label>
            <Form.Control
              type='text'
              placeholder='Description'
              required='required'
              value={formState.description}
              onChange={e =>
                setformState({ ...formState, description: e.target.value })
              }
            />
          </Form.Group>
          <ButtonRow>
            <ButtonForm type='submit' id='submit' value='Valider' />
          </ButtonRow>
        </Form>
        <GeneratePDF formState={formState} user={user} />
      </Container>
    </div>
  )
}

AddInvoice.propTypes = {
  idClient: PropTypes.string,
  invoice: PropTypes.object
}
const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`

const Input = styled.input`
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding-left: 35px;
  background: white;
`

const ButtonForm = styled.input`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export default AddInvoice
