import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TestBoard } from './Board';

function App() {
  return (
    <div className="App" style={{minHeight: "100vh"}}>
      <TestBoard />
    </div>
  );
}

export default App;
