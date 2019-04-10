import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo'

import Home from './Home';
import './App.css';

const App = ({client, ...props}) => (
  <ApolloProvider client={client}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </ApolloProvider>
);

export default App;
