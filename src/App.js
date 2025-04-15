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
        <h1 className='center-text'>Головна сторінка</h1>
        <h2 className='center-text'>Про себе</h2>

        <Footer />
      </div>
    </Router>
  );
}

export default App;