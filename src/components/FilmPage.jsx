//import React from 'react';
//import styles from '../styles/FilmList.module.css'; // Import the CSS module
//import { deleteFilm, getFilms, useAuth } from '../firebase/firebase'; // Import useAuth and Firebase functions

//export const FilmList = ({ director, isModalOpen, featuredOnly }) => {
//	const [films, setFilms] = React.useState([]);
//	const [filteredFilms, setFilteredFilms] = React.useState([]);
//	const user = useAuth(); // Use the custom hook to get the current user

//	React.useEffect(() => {
//		// Fetch all films from Firebase
//		getFilms().then(fetchedFilms => {
//			// Ensure each film has a valid date and sort by date
//			const sortedFilms = fetchedFilms
//				.filter(film => film.date) // Ensure 'date' exists
//				.sort((a, b) => {
//					const dateA = new Date(a.date);
//					const dateB = new Date(b.date);
//					return dateB - dateA; // Sort in descending order (latest date first)
//				});

//			setFilms(sortedFilms);
//		});
//	}, []);

//	React.useEffect(() => {
//		// Filter films based on the director if a director is specified
//		let updatedFilms = director
//			? films.filter(film => film.director === director)
//			: films;

//		// Apply featured filter if specified
//		if (featuredOnly) {
//			updatedFilms = updatedFilms.filter(film => film.featured);
//		}

//		setFilteredFilms(updatedFilms);
//	}, [films, director, featuredOnly]);

//	const handleDelete = async (filmId) => {
//		try {
//			await deleteFilm(filmId);
//			// Update the state to remove the deleted film from the list
//			setFilms(films.filter(film => film.id !== filmId));
//		} catch (error) {
//			console.error("Error deleting film: ", error);
//		}
//	};

//	return (
//		<div className={styles.listItemsContainer}>
//			{filteredFilms.map((film, index) => (
//				<div key={index} className={`${styles.videoCard} ${isModalOpen ? styles.disabled : ''}`}>
//					<iframe
//						src={film.url}
//						title={film.title}
//						allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
//						allowFullScreen
//					/>
//					<div className={styles.overlay}>
//						{!isModalOpen && (
//							<>
//								<div className={styles.title}>{film.title}</div>
//								{user && (
//									<button
//										className={styles.deleteButton}
//										onClick={() => handleDelete(film.id)}
//									>
//										Delete
//									</button>
//								)}
//							</>
//						)}
//					</div>
//				</div>
//			))}
//		</div>
//	);
//};
import React from 'react';
import styles from '../styles/FilmList.module.css'; // Import the CSS module
import { deleteFilm, getFilms, useAuth } from '../firebase/firebase'; // Import useAuth and Firebase functions
import SlideInComponent from './slider';
import { useLocation, useParams } from 'react-router-dom';
import { DirectorsPage } from './DirectorsPage';
import { AnimatePresence } from 'framer-motion';
import { FilmList } from './FilmList';

export const FilmPage = ({ isModalOpen, featuredOnly }) => {

	const location = useLocation()
	const showDirectors = location.pathname.includes("director")

	return (
		<div className={styles.filmPageRow}>

			{showDirectors && <SlideInComponent >
				<DirectorsPage />
			</SlideInComponent>}

			<FilmList isModalOpen={false} featuredOnly={featuredOnly} />
		</div>
	);
};
