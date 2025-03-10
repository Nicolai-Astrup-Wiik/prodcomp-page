import React from 'react';
import styles from '../styles/Footer.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth, logout } from '../firebase/firebase'; // Import useAuth and logout

export const Footer = () => {
	const navigate = useNavigate();
	const user = useAuth(); // Get the current user

	const handleLoginClick = () => {
		navigate('/login');
	};

	const handleLogoutClick = async () => {
		await logout();
		navigate('/login'); // Redirect to the login page
	};

	return (
		<div className={styles.footer}>
			<a href="mailto:ivan@pappenheimer.no">contact</a>
			{/*<p>all rights reserved</p>*/}

			<a href="callto:+47 407 18 976">+47 407 18 976</a>

			{!user && (
				<button onClick={handleLoginClick} className={styles.footerButton}>
					Log in
				</button>
			)}
			{user && (
				<button onClick={handleLogoutClick} className={styles.footerButton}>
					Log out
				</button>
			)}
		</div>
	);
};
