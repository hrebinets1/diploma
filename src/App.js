import React from 'react'
import Header from './Header';  
import Footer from './Footer';
import About from './pages/About'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App(){
  return(
    <Router>
      <div>
        <Header />
        <h1>Main text App</h1>
        <Footer />
      </div>
    </Router>
  );
}

export default App;