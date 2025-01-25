import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addFilm } from '../firebase/firebase'; // Ensure you have this function
import styles from '../styles/AddFilm.module.css'; // Ensure this CSS module exists

export const AddFilm = () => {
	const [filmValues, setFilmValues] = useState({
		title: '',
		director: '',
		client: '',
		url: '',
		date: '',
		featured: false, // Add the featured boolean
	});
	const [selectedFile, setSelectedFile] = useState(null);
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
		// Return the extracted URL or null if no match is found
		return match ? match[1] : null;
	}

	// Handle file input changes
	const handleFileChange = (e) => {
		setSelectedFile(e.target.files[0]);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();

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

		// Handle file upload if necessary
		if (selectedFile) {
			// Your upload logic here
		}

		// Reset form
		setFilmValues({
			title: '',
			director: '',
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
				<input
					type="text"
					name="title"
					value={filmValues.title}
					onChange={handleInputChange}
					placeholder="Title"
				/>
				<select type="text"
					name="director" onChange={handleInputChange} value={filmValues.director}>
					<option value="gaute">Gaute</option>
					<option value="nico">Nico</option>
					<option value="sigve">Sigve</option>
				</select>

				<input
					type="text"
					name="client"
					value={filmValues.client}
					onChange={handleInputChange}
					placeholder="Client"
				/>
				<input
					type="text"
					name="url"
					value={filmValues.url}
					onChange={handleInputChange}
					placeholder="URL"
				/>
				<input
					type="date"
					name="date"
					value={filmValues.date}
					onChange={handleInputChange}
				/>
				<label>
					<input
						type="checkbox"
						name="featured"
						checked={filmValues.featured}
						onChange={handleInputChange}
					/>
					Featured
				</label>
				<button type="submit">Add Film</button>
			</form>
		</div>
	);
};
