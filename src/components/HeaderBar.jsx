import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Modal from 'react-modal';
import styles from '../styles/HeaderBar.module.css';
import { useAuth } from '../firebase/firebase'; // Import the useAuth hook
import { LogoSVG } from './LogoSVG';
//import { ReactComponent as Logo } from '../assets/pnhmr.svg'; // Import SVG as a React component


Modal.setAppElement('#root');

const menuItems = [{ name: "Regissører", slug: "/directors" }, { name: "Om oss", slug: "/about" }, { name: "Kontakt", slug: "/contact" }]

export const HeaderBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const user = useAuth(); // Get the current user
  const location = useLocation() // get current location url


  return (
    <>
      {/* SVG as a Link to the home page */}
      <Link to="/" className={styles.linkContainer}>
        <LogoSVG />
      </Link >
      <nav>
        {menuItems.map((item) => {
          const active = location.pathname.includes(item.slug)
          return <Link className={active ? styles.navButtonActive : styles.navButton} key={item.slug} to={item.slug}>{item.name}</Link>
        })}

        {/*<Link to="/work">Arbeid</Link>*/}
        {user && ( // Check if the user is logged in
          <Link to="/addfilm" className={styles.addFilmButton}>
            Add Film
          </Link>
        )}
      </nav>

    </>
  );
};
