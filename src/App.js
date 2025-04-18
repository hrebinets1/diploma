import React from 'react';
import Header from './Header';  
import Footer from './Footer';
import Hello from './Hello';
import About from './pages/About';
import Reading from './pages/Reading';
import Vocabulary from './pages/Vocabulary';
import Listening from './pages/Listening';
import Skills from './pages/Skills';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 className='center-text'>Головна сторінка</h1>
      <h2 className='center-text'>Про себе</h2>
      <Hello className="main-text" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/reading" element={<Reading/>} />
          <Route path="/listening" element={<Listening />}/>
          <Route path="/vocabulary"  element={<Vocabulary />}/>
          <Route path="/skills" element={<Skills />}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
