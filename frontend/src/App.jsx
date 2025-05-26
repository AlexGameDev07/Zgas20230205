import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Empleados from './pages/empleadospg';
import Sucursales from './pages/branchespg';
import Productos from './pages/productospg';
import './App.css';

function App() {
  const showNavBar = () => {
    const { pathname } = window.location;
    if (pathname === "/login" || pathname === "/register") {
      return false;
    }
    return true;
  };

  return (
    <Router>
      <div className="app-container">
        {showNavBar() && <NavBar />}
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Sucursales />} />
            <Route path="/Branches" element={<Sucursales />} />
            <Route path="/Products" element={<Productos />} />
            <Route path="/Employee" element={<Empleados />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
