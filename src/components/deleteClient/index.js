import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DELETE_CLIENT from '../../graphql/DELETE_CLIENT'
import { useMutation } from '@apollo/client'

const DeleteClient = ({ idClient }) => {
  const [deleteClientById] = useMutation(DELETE_CLIENT)

  return (
    <section>
      <Container>
        <Button
          onClick={() => {
            deleteClientById({
              variables: {
                idClient: idClient
              }
            })
          }}
        />
      </Container>
    </section>
  )
}

DeleteClient.propTypes = {
  idClient: PropTypes.string
}

const Button = styled.button`
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

export default DeleteClient
