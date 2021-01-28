import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Button } from 'react-bootstrap'

import DELETE_CLIENT from '../../graphql/DELETE_CLIENT'
import ALL_CLIENTS_QUERY from '../../graphql/ALL_CLIENTS_QUERY'
import { useMutation } from '@apollo/client'

const DeleteClient = ({ idClient }) => {
  const [deleteClientById] = useMutation(DELETE_CLIENT)

  return (
    <section>
      <Container>
        <Button
          variant='warning'
          onClick={() => {
            deleteClientById({
              variables: {
                idClient: idClient
              },
              refetchQueries: [{ query: ALL_CLIENTS_QUERY }]
            })
          }}
        >
          Supprimer le client
        </Button>
      </Container>
    </section>
  )
}

DeleteClient.propTypes = {
  idClient: PropTypes.string
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default DeleteClient
