import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login';
import Chatbox from './Chatbox';

function App() {
  return (
    <Router>
      <div className="App">
        

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chatbox" element={<Chatbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
