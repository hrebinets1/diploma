import React from 'react';
import Header from './Header';  
import Footer from './Footer';
import Hello from './Hello';
import Reading from './pages/Reading';
import Vocabulary from './pages/Vocabulary';
import Listening from './pages/Listening';
import Login from './pages/Login';
import Register from './pages/Register';
import Grammar from './pages/Grammar';
import Profile from './pages/Profile';
import Times from './pages/Times';
import './css/app.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const Home = () => {
  return (
    <div>
      <h1 className='center-text'>Головна сторінка</h1>
      <h2 className='center-text'>Про себе</h2>
      <Hello className="main-text" />
    </div>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/reading" element={<Reading />} />
              <Route path="/listening" element={<Listening />} />
              <Route path="/vocabulary" element={<Vocabulary />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/grammar" element={<Grammar />} />
              <Route path="/profile" element={<Profile />} />
              <Route path='/times' element={<Times />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
