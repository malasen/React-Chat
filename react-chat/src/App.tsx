import React from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/GenerateUser';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        <User />
        </p>
      </header>
    </div>
  );
}

export default App;
