import React, { Component } from 'react';


import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from 'react-router-dom';

import Game from '../Game';
import GameNav from '../Navigation'
import GameTitle from '../GameTitle'
import { Layout } from 'antd';

const App = () => (
  <Router>
    <Redirect from='/' to='/home' />
    <Layout>
      <GameTitle />
      <Layout  style={{backgroundColor:"#013220", borderStyle: 'solid', borderWidth: 5, borderColor:'#013220'}} >
        <GameNav />
        <Route exact path="/home" />
        <Route path="/home/game" component={Game} />
      </Layout>
    </Layout>
  </Router>
)

export default App;
