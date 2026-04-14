import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import DataSources from './pages/DataSources';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/data-sources" element={<DataSources />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;