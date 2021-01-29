import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/invoice.css'

import PropTypes from 'prop-types'

import 'normalize.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../../lib/apolloClient'

import { ApolloClient, InMemoryCache } from '@apollo/client'

export default function App({ Component, pageProps }) {
  // const apolloClient = useApollo(pageProps.initialApolloState)
  const client = new ApolloClient({
    uri: 'https://apollo-invoice.herokuapp.com/graphql',
    cache: new InMemoryCache()
  })

  return (
    <ApolloProvider client={client}>
      <div>
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}

App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any
}
