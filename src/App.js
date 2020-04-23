import React, { Component } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import Login from './components/login';
import MovieContainer from './components/MovieContainer';
import Watchlist from './components/Watchlist'
import Navbar from './components/Navbar'
import Seen from './components/Seen'



class App extends Component {
  render() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/movies' component={MovieContainer} />
          <Route path='/watchlist' component={Watchlist} />
          <Route path='/seen' component={Seen} />
        </Switch>
      </div>
    </BrowserRouter>
  );
  }
}

export default App;
