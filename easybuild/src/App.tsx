import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Homepage from './pages/Homepage';
import Builder from './pages/Builder';
import Results from './pages/Results';
import Glossary from './pages/Glossary';
import Admin from './pages/Admin';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/builder" element={<Builder />} />
          <Route path="/results" element={<Results />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
