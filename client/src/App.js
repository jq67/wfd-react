import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Footer from './components/Footer';
import Header from './components/Header';
import Aside from './components/Aside';

import Allmeals from './pages/AllMeals';
import Allplans from './pages/AllPlans';
import Login from './pages/Login';
import Signup from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Recipewrapper from './pages/Recipewrapper';

import './pages/style.css'

import Auth from './utils/auth'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header></Header>
          <main className="main">
            <div className="container-fluid">
            <div className="row">
                <div className="col-sm-9 bg-image bodyStyle" id="bodybottom">
                  <Routes>
                    <Route path='/' element={<Home></Home>}></Route>
                    <Route path='/allmeals' element={<Allmeals></Allmeals>}></Route>
                    <Route path='/allplans' element={<Allplans></Allplans>}></Route>
                    <Route path='/login' element={<Login></Login>}></Route>
                    <Route path='/signup' element={<Signup></Signup>}></Route>
                    {Auth.loggedIn() ? (
                    <Route path='/profile' element={<Profile></Profile>}></Route>
                    ) : (
                    <Route path='/profile' element={<Login></Login>}></Route>
                    )}
                    {Auth.loggedIn() ? (
                    <Route path='/recipe/:_id' element={<Recipewrapper></Recipewrapper>}></Route>
                    ) : (
                    <Route path='/recipe/:_id' element={<Login></Login>}></Route>
                    )}
                  </Routes>
                </div>
                <Aside></Aside>
            </div>
            </div>
          </main>
        <Footer></Footer>
      </Router>
    </ApolloProvider>
  );
}

export default App;