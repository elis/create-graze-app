import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'

import Site from './site'

const Styles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`

const App = ({client, ...props}) => (
  <React.Fragment>
    <Styles />
    <ApolloProvider client={client}>
      <Site />
    </ApolloProvider>
  </React.Fragment>
);

export default App
