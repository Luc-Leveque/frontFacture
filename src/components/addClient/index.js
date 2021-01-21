import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
    <section>
      <Container
        onSubmit={e => {
          e.preventDefault()
          if (formState.id) {
            console.log(formState)
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
        <Input
          type='text'
          placeholder='Nom'
          required='required'
          value={formState.name}
          onChange={e => setformState({ ...formState, name: e.target.value })}
        />
        <Input
          type='text'
          placeholder='Adresse'
          required='required'
          value={formState.address}
          onChange={e =>
            setformState({ ...formState, address: e.target.value })
          }
        />
        <Input
          type='text'
          placeholder='Siret'
          required='required'
          value={formState.siret}
          onChange={e => setformState({ ...formState, siret: e.target.value })}
        />
        <Input
          type='text'
          placeholder='Email'
          required='required'
          value={formState.email}
          onChange={e => setformState({ ...formState, email: e.target.value })}
        />
        <Input
          type='text'
          placeholder='N° de Telephone'
          required='required'
          value={formState.phoneNumber}
          onChange={e =>
            setformState({ ...formState, phoneNumber: e.target.value })
          }
        />

        <Button type='submit' id='submit' value='Post' />
      </Container>
    </section>
  )
}

AddClient.propTypes = {
  isPublic: PropTypes.bool,
  client: PropTypes.object
}

const Input = styled.input`
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding-left: 35px;
  background: white;
`

const Button = styled.input`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default AddClient
