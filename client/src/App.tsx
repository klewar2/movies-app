import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import apolloClient from './configureClient';
import { ToastContainer } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import Movies from './routes/Movies';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route exact path="/" component={Movies} />
          <Route path="*" render={() => <Redirect to={'/'} />} />
        </Switch>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
      />
    </ApolloProvider>
  );
};

export default App;
