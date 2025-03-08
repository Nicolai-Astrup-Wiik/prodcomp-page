import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { HeaderBar } from './components/HeaderBar';
import { AboutPage } from './components/AboutPage';
import { WorkPage } from './components/WorkPage';
import { FilmList } from './components/FilmList'; // Import the FilmList component
import { Footer } from './components/Footer';
import { Login } from './components/Login';
import { AddFilm } from './components/AddFilm'
import { DirectorsPage } from './components/DirectorsPage'
import { FilmPage } from './components/FilmPage';

function App() {

  const [user, setUser] = useState(undefined);

  return (
    <Router>
      <HeaderBar />
      <Routes>
        {/* Default route can be set to FilmList or another page */}
        <Route path="/directors" element={<FilmPage featuredOnly={true} isModalOpen={undefined} />} />
        <Route path="/directors/:director" element={<FilmPage featuredOnly={true} isModalOpen={undefined} />} />
        <Route path="/" element={<FilmPage featuredOnly={true} isModalOpen={undefined} />} />
        <Route path="/about" element={<AboutPage />} />
        {/*<Route path="/work" element={<WorkPage />} />*/}
        {/* <Route path="/directors/nicolai-astrup-wiik" element={<FilmList director="nico" />} />
        <Route path="/directors/gaute-hesthagen" element={<FilmList director="gaute" />} />
        <Route path="/directors/sigve-aspelund" element={<FilmList director="sigve" />} />
        <Route path="/directors/alexander-halvorsen" element={<FilmList director="alexander" />} />
        <Route path="/directors/oskar-johansen" element={<FilmList director="oskar" />} />
        <Route path="/directors/mauritz-brekke-solberg" element={<FilmList director="mauritz" />} />*/}
        <Route path="/login" element={<Login onLoginSuccess={setUser} />} />
        <Route path="/addfilm" element={<AddFilm />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
