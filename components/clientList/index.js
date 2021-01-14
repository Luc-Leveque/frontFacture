import { gql, useQuery } from '@apollo/client'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 18
  },
  pos: {
    marginBottom: 12,
    fontSize: 12
  }
})

export const ALL_CLIENTS_QUERY = gql`
  query allClients {
    getClients {
      id
      name
    }
  }
`

export default function ClientList() {
  const classes = useStyles()
  const { loading, error, data } = useQuery(ALL_CLIENTS_QUERY)

  if (error) return <div>Error loading clients.</div>
  if (loading) return <div>Loading</div>

  const { getClients: allClients } = data

  return (
    <Grid style={{ marginTop: '20px' }} container spacing={2}>
      {allClients.map(client => (
        <Grid item xs={4} key={client.id}>
          <Card className={classes.root}>
            <CardContent>
              <Typography
                className={classes.title}
                color='textPrimary'
                gutterBottom
              >
                {client.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
