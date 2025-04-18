// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import Dashboard from './components/Dashboard';
import ModulePage from './components/ModulePage';

function App() {
  return (
    <Router>
      <Routes>
	    <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/module/:id" element={<ModulePage />} />
      </Routes>
    </Router>
  );
}

export default App;
