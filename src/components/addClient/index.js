import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import ADD_CLIENT from '../../graphql/ADD_CLIENT'
import UPDATE_CLIENT from '../../graphql/UPDATE_CLIENT'
import ALL_CLIENTS_QUERY from '../../graphql/ALL_CLIENTS_QUERY'

const AddClient = ({ isPublic = false, client = {} }) => {
  const [formState, setformState] = useState(
    client || {
      name: '',
      siret: '',
      address: '',
      email: '',
      phoneNumber: ''
    }
  )

  const updateCache = (cache, { data }) => {
    // If this is for the public feed, do nothing
    if (isPublic) {
      return null
    }
    // Fetch the todos from the cache
    const existingClients = cache.readQuery({
      query: ALL_CLIENTS_QUERY
    })

    // Add the new todo to the cache
    const newClient = data.createClient

    cache.writeQuery({
      query: ALL_CLIENTS_QUERY,
      data: { clients: [newClient, ...existingClients.getClients] }
    })
  }

  const resetInput = () => {
    setformState({
      name: '',
      siret: '',
      address: '',
      email: '',
      phoneNumber: ''
    })
  }

  const [addClient] = useMutation(ADD_CLIENT, {
    update: updateCache,
    onCompleted: resetInput
  })

  const [updateClientById] = useMutation(UPDATE_CLIENT)
  const router = useRouter()
  return (
    <Container fluid>
      <Form
        onSubmit={e => {
          e.preventDefault()
          if (formState.id) {
            updateClientById({
              variables: {
                idClient: formState.id,
                name: formState.name,
                siret: formState.siret,
                address: formState.address,
                email: formState.email,
                phoneNumber: formState.phoneNumber
              },
              refetchQueries: [{ query: ALL_CLIENTS_QUERY }]
            })
            router.push('/clientPages/listClients')
          } else {
            addClient({
              variables: {
                name: formState.name,
                siret: formState.siret,
                address: formState.address,
                email: formState.email,
                phoneNumber: formState.phoneNumber
              },
              refetchQueries: [{ query: ALL_CLIENTS_QUERY }]
            })
            e.target.reset()
          }
        }}
      >
        <Form.Group controlId='formBasicName'>
          <Form.Label>Nom Client</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nom'
            required='required'
            value={formState.name}
            onChange={e => setformState({ ...formState, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId='formBasicAddress'>
          <Form.Label>Adresse Client</Form.Label>
          <Form.Control
            type='text'
            placeholder='Adresse'
            required='required'
            value={formState.address}
            onChange={e =>
              setformState({ ...formState, address: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicSiret'>
          <Form.Label>Siret Client</Form.Label>
          <Form.Control
            type='text'
            placeholder='Siret'
            required='required'
            value={formState.siret}
            onChange={e =>
              setformState({ ...formState, siret: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email Client</Form.Label>
          <Form.Control
            type='text'
            placeholder='Email'
            required='required'
            value={formState.email}
            onChange={e =>
              setformState({ ...formState, email: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicPhone'>
          <Form.Label>Numero de Teléphone</Form.Label>
          <Form.Control
            type='text'
            placeholder='N° de Telephone'
            required='required'
            value={formState.phoneNumber}
            onChange={e =>
              setformState({ ...formState, phoneNumber: e.target.value })
            }
          />
        </Form.Group>
        <Button variant='primary' type='submit' id='submit' value='Post'>
          Valider
        </Button>
      </Form>
    </Container>
  )
}

AddClient.propTypes = {
  isPublic: PropTypes.bool,
  client: PropTypes.object
}

export default AddClient
