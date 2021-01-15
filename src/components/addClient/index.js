import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { gql, useMutation } from '@apollo/client'

const ADD_CLIENT = gql`
  mutation addClient(
    $name: String!
    $siret: String!
    $address: String!
    $email: String!
    $phoneNumber: String!
    $logo: String!
  ) {
    createClient(
      name: $name
      siret: $siret
      address: $address
      email: $email
      phoneNumber: $phoneNumber
      logo: $logo
    ) {
      id
      name
      siret
      email
      phoneNumber
      logo
      address
    }
  }
`
const ALL_CLIENTS_QUERY = gql`
  query allClients {
    getClients {
      id
      name
    }
  }
`

const AddClient = ({ isPublic = false }) => {
  const [formState, setformState] = useState({
    name: '',
    siret: '',
    address: '',
    email: '',
    phoneNumber: '',
    logo: ''
  })

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
      phoneNumber: '',
      logo: ''
    })
  }

  const [addClient] = useMutation(ADD_CLIENT, {
    update: updateCache,
    onCompleted: resetInput
  })

  return (
    <section>
      <Container
        onSubmit={e => {
          e.preventDefault()
          addClient({
            variables: {
              name: formState.name,
              siret: formState.siret,
              address: formState.address,
              email: formState.email,
              phoneNumber: formState.phoneNumber,
              logo: formState.logo
            },
            refetchQueries: [{ query: ALL_CLIENTS_QUERY }]
          })
          e.target.reset()
        }}
      >
        <Input
          type='text'
          placeholder='Nom'
          required='required'
          onChange={e => setformState({ ...formState, name: e.target.value })}
        />
        <Input
          type='text'
          placeholder='Adresse'
          required='required'
          onChange={e =>
            setformState({ ...formState, address: e.target.value })
          }
        />
        <Input
          type='text'
          placeholder='Siret'
          required='required'
          onChange={e => setformState({ ...formState, siret: e.target.value })}
        />
        <Input
          type='text'
          placeholder='Email'
          required='required'
          onChange={e => setformState({ ...formState, email: e.target.value })}
        />
        <Input
          type='text'
          placeholder='N° de Telephone'
          required='required'
          onChange={e =>
            setformState({ ...formState, phoneNumber: e.target.value })
          }
        />
        <Input
          type='text'
          placeholder='Logo'
          onChange={e => setformState({ ...formState, logo: e.target.value })}
        />

        <Button type='submit' id='submit' value='Post' />
      </Container>
    </section>
  )
}

AddClient.propTypes = {
  isPublic: PropTypes.bool
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
