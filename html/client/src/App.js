import React, { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './components/Navbar';
import List from './components/List';
import Edit from './components/Edit';
import Details from './components/Details';

import Adminregister from './components/Adminregister'
import Userdata from './components/Userdata';
import Alert from './components/Alert';

//redux
import { Provider } from 'react-redux';
import store from './store';

import './App.css';

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <Routes>
    
          <Route path="/adminregister" element={<Adminregister />} />
          <Route path="/" element={<List />} />
          <Route path="/userdata" element={<Userdata />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </Fragment>
    </Router>
    </Provider>
  );


export default App;
