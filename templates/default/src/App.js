import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'
import { createGlobalStyle } from 'styled-components'

import Home from './Home';

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
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </ApolloProvider>
  </React.Fragment>
);

export default App;
