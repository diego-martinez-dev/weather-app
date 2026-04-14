import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SettingsProvider } from './contexts/SettingsContext';
import './App.css';
import TopMenu from './components/TopMenu';
import Footer from './components/Footer';
import Home from './pages/Home';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Cookies from './pages/Cookies';
import DataSources from './pages/DataSources';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <div className="App">
          <TopMenu />
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
    </SettingsProvider>
  );
}

export default App;