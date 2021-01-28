import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button, Container } from 'react-bootstrap'

import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import UPDATE_USER from '../../graphql/UPDATE_USER'
import GET_USER from '../../graphql/GET_USER'

const UpdateUser = ({ user }) => {
  const [formState, setformState] = useState(user)
  const idUser = '601295d3b376a13408e72b9f'

  const [updateUser] = useMutation(UPDATE_USER)

  const router = useRouter()
  return (
    <Container fluid>
      <Form
        onSubmit={e => {
          e.preventDefault()

          updateUser({
            variables: {
              idUser: formState.id,
              firstName: formState.firstName,
              lastName: formState.lastName,
              email: formState.email,
              societe: formState.societe,
              codePostal: formState.codePostal,
              ville: formState.ville,
              adresse: formState.adresse
            },
            refetchQueries: [{ query: GET_USER, variables: { idUser } }]
          })
          router.push('/clientPages/listClients')
        }}
      >
        <Form.Group controlId='formBasicName'>
          <Form.Label>Prenom User</Form.Label>
          <Form.Control
            type='text'
            placeholder='Prenom'
            required='required'
            value={formState.firstName}
            onChange={e =>
              setformState({ ...formState, firstName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicAddress'>
          <Form.Label>Nom User</Form.Label>
          <Form.Control
            type='text'
            placeholder='Nom'
            required='required'
            value={formState.lastName}
            onChange={e =>
              setformState({ ...formState, lastName: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicSiret'>
          <Form.Label>Email User</Form.Label>
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
        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Societe</Form.Label>
          <Form.Control
            type='text'
            placeholder='Societe'
            required='required'
            value={formState.societe}
            onChange={e =>
              setformState({ ...formState, societe: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicPhone'>
          <Form.Label>Code Postal</Form.Label>
          <Form.Control
            type='text'
            placeholder='Code Postal'
            required='required'
            value={formState.codePostal}
            onChange={e =>
              setformState({ ...formState, codePostal: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicPhone'>
          <Form.Label>Ville</Form.Label>
          <Form.Control
            type='text'
            placeholder='Ville'
            required='required'
            value={formState.ville}
            onChange={e =>
              setformState({ ...formState, ville: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId='formBasicPhone'>
          <Form.Label>Adresse</Form.Label>
          <Form.Control
            type='text'
            placeholder='Adresse'
            required='required'
            value={formState.adresse}
            onChange={e =>
              setformState({ ...formState, adresse: e.target.value })
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

UpdateUser.propTypes = {
  user: PropTypes.object
}

export default UpdateUser
