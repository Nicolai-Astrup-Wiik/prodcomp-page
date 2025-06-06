//import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
//import { addFilm } from '../firebase/firebase'; // Ensure you have this function
//import styles from '../styles/AddFilm.module.css'; // Ensure this CSS module exists

//export const AddFilm = () => {
//	const [filmValues, setFilmValues] = useState({
//		title: '',
//		director: '',
//		client: '',
//		url: '',
//		date: '',
//		featured: false, // Add the featured boolean
//	});
//	const [selectedFile, setSelectedFile] = useState(null);
//	const navigate = useNavigate();

//	// Handle input changes
//	const handleInputChange = (e) => {
//		const { name, value, type, checked } = e.target;
//		setFilmValues((prev) => ({
//			...prev,
//			[name]: type === 'checkbox' ? checked : value,
//		}));
//	};

//	// Extract the src URL from the embed code
//	function extractIframeSrc(embedCode) {
//		// Use a regular expression to extract the src attribute from an iframe tag
//		const srcPattern = /<iframe[^>]+src=["']([^"']+)["']/i;
//		const match = embedCode.match(srcPattern);
//		// Return the extracted URL or null if no match is found
//		return match ? match[1] : null;
//	}

//	// Handle file input changes
//	const handleFileChange = (e) => {
//		setSelectedFile(e.target.files[0]);
//	};

//	// Handle form submission
//	const handleSubmit = async (e) => {
//		e.preventDefault();

//		// Extract the iframe src URL if URL is an embed code
//		const extractedUrl = extractIframeSrc(filmValues.url) || filmValues.url;

//		// Prepare film data
//		const filmData = {
//			...filmValues,
//			url: extractedUrl,
//			filename: selectedFile ? selectedFile.name : '',
//		};

//		// Add the film to Firebase
//		await addFilm(filmData);

//		// Handle file upload if necessary
//		if (selectedFile) {
//			// Your upload logic here
//		}

//		// Reset form
//		setFilmValues({
//			title: '',
//			director: '',
//			client: '',
//			url: '',
//			date: '',
//			featured: false,
//		});
//		setSelectedFile(null);
//		e.target.reset();
//		navigate('/');
//	};

//	return (
//		<div className={styles.container}>
//			<form className={styles.AddForm} onSubmit={handleSubmit}>
//				<input
//					type="text"
//					name="title"
//					value={filmValues.title}
//					onChange={handleInputChange}
//					placeholder="Title"
//				/>
//				<select type="text"
//					name="director" onChange={handleInputChange} value={filmValues.director}>
//					<option value="gaute">Gaute</option>
//					<option value="nico">Nico</option>
//					<option value="sigve">Sigve</option>
//					<option value="alexander">Alexander</option>
//					<option value="oskar">Oskar</option>
//					<option value="mauritz">Mauritz</option>
//				</select>

//				<input
//					type="text"
//					name="client"
//					value={filmValues.client}
//					onChange={handleInputChange}
//					placeholder="Client"
//				/>
//				<input
//					type="text"
//					name="url"
//					value={filmValues.url}
//					onChange={handleInputChange}
//					placeholder="URL"
//				/>
//				<input
//					type="date"
//					name="date"
//					value={filmValues.date}
//					onChange={handleInputChange}
//				/>
//				<label>
//					<input
//						type="checkbox"
//						name="featured"
//						checked={filmValues.featured}
//						onChange={handleInputChange}
//					/>
//					Featured
//				</label>
//				<button type="submit">Add Film</button>
//			</form>
//		</div>
//	);
//};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFilm } from '../firebase/firebase'; // Ensure you have this function
import styles from '../styles/AddFilm.module.css'; // Ensure this CSS module exists

export const AddFilm = () => {
	const [filmValues, setFilmValues] = useState({
		title: '',
		director: '', // Default is an empty string
		client: '',
		url: '',
		date: '',
		featured: false, // Add the featured boolean
	});
	const [selectedFile, setSelectedFile] = useState(null);
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	// Handle input changes
	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFilmValues((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

	// Extract the src URL from the embed code
	function extractIframeSrc(embedCode) {
		// Use a regular expression to extract the src attribute from an iframe tag
		const srcPattern = /<iframe[^>]+src=["']([^"']+)["']/i;
		const match = embedCode.match(srcPattern);
		return match ? match[1] : null;
	}

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validate fields
		const newErrors = {};
		if (!filmValues.title.trim()) newErrors.title = 'Title is required.';
		if (!filmValues.director || filmValues.director === 'default')
			newErrors.director = 'Please select a director.';
		if (!filmValues.client.trim()) newErrors.client = 'Client is required.';
		if (!filmValues.url.trim()) newErrors.url = 'URL is required.';
		if (!filmValues.date.trim()) newErrors.date = 'Date is required.';

		// If there are errors, set them and return early
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		// Clear errors
		setErrors({});

		// Extract the iframe src URL if URL is an embed code
		const extractedUrl = extractIframeSrc(filmValues.url) || filmValues.url;

		// Prepare film data
		const filmData = {
			...filmValues,
			url: extractedUrl,
			filename: selectedFile ? selectedFile.name : '',
		};

		// Add the film to Firebase
		await addFilm(filmData);

		// Reset form
		setFilmValues({
			title: '',
			director: '', // Reset to default
			client: '',
			url: '',
			date: '',
			featured: false,
		});
		setSelectedFile(null);
		e.target.reset();
		navigate('/');
	};

	return (
		<div className={styles.container}>
			<form className={styles.AddForm} onSubmit={handleSubmit}>
				{/* Title Field */}
				<div className={styles.InputWrapper}>
					<input
						type="text"
						name="title"
						value={filmValues.title}
						onChange={handleInputChange}
						placeholder="Title"
					/>
					<div className={styles.ErrorContainer}>
						{errors.title && <p>{errors.title}</p>}
					</div>
				</div>

				{/* Director Field */}
				<div className={styles.InputWrapper}>
					<select
						name="director"
						onChange={handleInputChange}
						value={filmValues.director}
					>
						<option value="default">Velg regissør</option>
						<option value="gaute">Gaute</option>
						<option value="nico&links">Nico & Links</option>
						<option value="sigve">Sigve</option>
						<option value="oskar">Oskar</option>
						<option value="mauritz">Mauritz</option>
						<option value="livmari">Liv Mari</option>
						<option value="alflovvold">Alf</option>
						<option value="kristofferklunknyborg">Kristoffer</option>
					</select>
					<div className={styles.ErrorContainer}>
						{errors.director && <p>{errors.director}</p>}
					</div>
				</div>

				{/* Client Field */}
				<div className={styles.InputWrapper}>
					<input
						type="text"
						name="client"
						value={filmValues.client}
						onChange={handleInputChange}
						placeholder="Client"
					/>
					<div className={styles.ErrorContainer}>
						{errors.client && <p>{errors.client}</p>}
					</div>
				</div>

				{/* URL Field */}
				<div className={styles.InputWrapper}>
					<input
						type="text"
						name="url"
						value={filmValues.url}
						onChange={handleInputChange}
						placeholder="URL"
					/>
					<div className={styles.ErrorContainer}>
						{errors.url && <p>{errors.url}</p>}
					</div>
				</div>

				{/* Date Field */}
				<div className={styles.InputWrapper}>
					<input
						type="date"
						name="date"
						value={filmValues.date}
						onChange={handleInputChange}
					/>
					<div className={styles.ErrorContainer}>
						{errors.date && <p>{errors.date}</p>}
					</div>
				</div>

				{/* Featured Checkbox */}
				<div className={styles.InputWrapper}>
					<label>
						<input
							type="checkbox"
							name="featured"
							checked={filmValues.featured}
							onChange={handleInputChange}
						/>
						Featured
					</label>
				</div>

				{/* Submit Button */}
				<div className={styles.ButtonWrapper}>
					<button type="submit">Add Film</button>
				</div>
			</form>
		</div>
	);
};
