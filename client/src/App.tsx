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
import { Container, Row, Col } from 'reactstrap';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'react-toastify/dist/ReactToastify.css';
import logo from './logo.svg';
import Movies from './routes/Movies';
import AddMovie from './routes/AddMovie';
import Header from './components/Header';
import UpdateMovie from './routes/UpdateMovie';

const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <Router>
        <Container>
          <Header />
          <Row>
            <Col>
              <Switch>
                <Route exact path="/" component={Movies} />
                <Route path="/movies/add" component={AddMovie} />
                <Route path="/movies/:id/update" component={UpdateMovie} />
                <Route path="*" render={() => <Redirect to={'/'} />} />
              </Switch>
            </Col>
          </Row>
        </Container>
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
