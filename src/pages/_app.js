import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.css'
import '../styles/styles.css'
import '../styles/invoice.css'

import PropTypes from 'prop-types'

import 'normalize.css'

import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../../lib/apolloClient'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
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
