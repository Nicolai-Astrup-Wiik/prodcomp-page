import React, { useState } from 'react';
import { firebaseLogin } from '../firebase/firebase';
import styles from '../styles/Login.module.css'
import { useNavigate } from 'react-router-dom';

export function Login({ onLoginSuccess }) {
	const navigate = useNavigate();
	const [loginValues, setLoginValues] = useState({ password: '', email: '' });
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	const handleEmailInput = (e) => {
		const email = e.target.value;
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation

		setLoginValues((prev) => ({ ...prev, email }));

		if (!email) {
			// Handle empty input
			setEmailError('Email is required.');
		} else if (!emailPattern.test(email)) {
			// Handle invalid email format
			setEmailError('Invalid email format.');
		} else {
			// Clear the error if input is valid
			setEmailError('');
		}
	};

	const handlePasswordInput = (e) => {
		const password = e.target.value;
		setLoginValues((prev) => ({ ...prev, password }));

		if (!password) {
			// Handle empty password
			setPasswordError('Password is required.');
		} else if (password.length < 6) {
			// Handle password too short
			setPasswordError('Password must be at least 6 characters long.');
		} else {
			// Clear the error if input is valid
			setPasswordError('');
		}
	};

	const handleLogin = async (e) => {
		e.preventDefault(); // Prevent default form submission

		// Perform client-side validation before attempting login
		if (!loginValues.email || !loginValues.password) {
			if (!loginValues.email) setEmailError('Email is required.');
			if (!loginValues.password) setPasswordError('Password is required.');
			return; // Stop form submission if validation fails
		}

		const result = await firebaseLogin(loginValues.email, loginValues.password);
		if (result.type !== 'error') {
			onLoginSuccess(result.user);
			console.log('you signed in')
			navigate('/admin');
		}
	};

	return (
		<div className={styles.LoginFormContainer}>
			<form className={styles.LoginForm} onSubmit={handleLogin}>
				<div className={styles.InputWrapper}>
					<input
						placeholder='e-mail'
						name='email'
						type='email'
						value={loginValues.email}
						onChange={handleEmailInput}
					/>
					{emailError && <p className={styles.Error}>{emailError}</p>}
				</div>
				<div className={styles.InputWrapper}>
					<input
						placeholder='password'
						name='password'
						type='password'
						value={loginValues.password}
						onChange={handlePasswordInput}
					/>
					{passwordError && <p className={styles.Error}>{passwordError}</p>}
				</div>
				<button type='submit'>Log in</button>
			</form>
		</div>
	);
}
