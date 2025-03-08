import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import styles from '../styles/HeaderBar.module.css';
import { useAuth } from '../firebase/firebase'; // Import the useAuth hook
import { LogoSVG } from './LogoSVG';
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
      <Link to="/" className={styles.linkContainer}>
        <LogoSVG />


      </Link >
      <nav>
        {/*<button onClick={openModal}>Regissører</button>*/}
        <Link to="/directors" className={styles.navButton}>Regissører</Link>
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
          {/*<li><Link to="/directors/mauritz-brekke-solberg" onClick={closeModal}>Mauritz Brekke Solberg</Link></li>
          <li><Link to="/directors/oskar-johansen" onClick={closeModal}>Oskar Johansen</Link></li>*/}
          {/*<li><Link to="/directors/alexander-halvorsen" onClick={closeModal}>Alexander Halvorsen</Link></li>*/}
        </ul>
        <button className={styles.modalCloseButton} onClick={closeModal}>×</button>
      </Modal>
    </>
  );
};
