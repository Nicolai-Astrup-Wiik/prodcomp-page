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
		window.location.reload(); // Optional: Refresh the page after logout to reflect the changes
	};

	return (
		<div className={styles.footer}>
			<p>contact: ivan@pappenheimer.no</p>
			<p>all rights reserved</p>

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
