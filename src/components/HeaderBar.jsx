import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import styles from '../styles/HeaderBar.module.css';
import { useAuth } from '../firebase/firebase'; // Import the useAuth hook
//import { ReactComponent as Logo } from '../assets/pnhmr.svg'; // Import SVG as a React component


Modal.setAppElement('#root');

export const HeaderBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useAuth(); // Get the current user

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      {/* SVG as a Link to the home page */}
      <Link to="/" className="link-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 400 150"
          width="400"
          height="150"
        >
          <text
            x="50%"
            y="50"
            textAnchor="middle"
            fontFamily="'Poppins', sans-serif"
            fontSize="32"
            fontWeight="bold"
            fill="black"
          >
            PNHMR
          </text>
          <line x1="100" y1="60" x2="300" y2="60" stroke="black" strokeWidth="2" />
          <text
            x="50%"
            y="90"
            textAnchor="middle"
            fontFamily="'Poppins', sans-serif"
            fontSize="16"
            fontWeight="normal"
            fill="black"
          >
            PAPPENHEIMER
          </text>
        </svg>


      </Link >
      <h2>mustering new website soon...</h2>
      <nav>
        <button onClick={openModal}>Regissører</button>
        <Link to="/about">Om oss</Link>
        {/*<Link to="/work">Arbeid</Link>*/}
        {user && ( // Check if the user is logged in
          <Link to="/addfilm" className={styles.addFilmButton}>
            Add Film
          </Link>
        )}
      </nav>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Directors Modal"
        className={styles.modalContent}
        overlayClassName={styles.ReactModal__Overlay} // Apply custom overlay styles
      >
        <h2>Directors</h2>
        <ul>
          {/*<li><Link to="/directors/nicolai-astrup-wiik" onClick={closeModal}>Nicolai Astrup Wiik</Link></li>*/}
          <li><Link to="/directors/gaute-hesthagen" onClick={closeModal}>Gaute Hesthagen</Link></li>
          <li><Link to="/directors/sigve-aspelund" onClick={closeModal}>Sigve Aspelund</Link></li>
          <li><Link to="/directors/alexander-halvorsen" onClick={closeModal}>Alexander Halvorsen</Link></li>
        </ul>
        <button className={styles.modalCloseButton} onClick={closeModal}>×</button>
      </Modal>
    </>
  );
};
