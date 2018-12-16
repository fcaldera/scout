import React, { Component } from 'react';
import Button from './Button';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button>Load data</Button>
        </header>
      </div>
    );
  }
}

export default App;
