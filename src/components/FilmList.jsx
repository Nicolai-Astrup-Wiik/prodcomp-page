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
import ReactPlayer from 'react-player/vimeo';
import styles from '../styles/FilmList.module.css';
import { deleteFilm, getFilms, useAuth, updateFilmPriority as updatePriorityInDB } from '../firebase/firebase';
import { useLocation, useParams } from 'react-router-dom';

export const FilmList = ({ isModalOpen, featuredOnly }) => {
	const [films, setFilms] = React.useState([]);
	const [filteredFilms, setFilteredFilms] = React.useState([]);
	const [playingFilmId, setPlayingFilmId] = React.useState(null); // Track the playing film ID
	const { director } = useParams();
	const location = useLocation();
	const showDirectors = location.pathname.includes('director');
	const user = useAuth();

	React.useEffect(() => {
		getFilms().then((fetchedFilms) => {
			const sortedFilms = fetchedFilms
				.filter((film) => film.date)
				.sort((a, b) => new Date(b.date) - new Date(a.date));
			setFilms(sortedFilms);
		});
	}, []);

	React.useEffect(() => {
		let updatedFilms = director
			? [...films].filter((film) => film.director === director)
			: [...films];

		if (featuredOnly) {
			updatedFilms = updatedFilms.filter((film) => film.featured).sort(() => Math.random() - 0.5);
		} else {
			updatedFilms = updatedFilms.sort((a, b) => {
				if (a.priority && b.priority) return a.priority - b.priority;
				if (a.priority) return -1;
				if (b.priority) return 1;
				return new Date(b.date) - new Date(a.date);
			});
		}

		setFilteredFilms(updatedFilms);
	}, [films, director, featuredOnly]);

	const handleDelete = async (filmId) => {
		try {
			await deleteFilm(filmId);
			setFilms(films.filter((film) => film.id !== filmId));
		} catch (error) {
			console.error('Error deleting film: ', error);
		}
	};
	const updateFilmPriority = async (filmId, newPriority) => {
		try {
			const conflictingFilm = films.find(
				(film) => film.priority === newPriority && film.id !== filmId
			);

			if (conflictingFilm) {
				await updatePriorityInDB(conflictingFilm.id, null);
			}

			await updatePriorityInDB(filmId, newPriority);

			setFilms((prevFilms) =>
				prevFilms.map((film) => {
					if (film.id === filmId) return { ...film, priority: newPriority };
					if (film.id === conflictingFilm?.id) return { ...film, priority: null };
					return film;
				})
			);
		} catch (error) {
			console.error('Error updating priority: ', error);
		}
	};

	// Handle play event to show the progress bar
	const handlePlay = (filmId) => {
		setPlayingFilmId(filmId);
	};

	return (
		<div className={showDirectors ? styles.listItemsContainerDirectors : styles.listItemsContainer}>
			{filteredFilms.map((film) => (
				<div key={film.url} className={`${styles.videoCard} ${isModalOpen ? styles.disabled : ''}`}>
					<ReactPlayer
						url={film.url}
						onPlay={() => handlePlay(film.id)}  // Trigger play event
						playing={film.id === playingFilmId} // Only show progress bar if this film is playing
						controls={true}  // Show controls (including progress bar)
						width="100%"
						height="100%"
					/>
					<div className={styles.overlay}>
						{!isModalOpen && (
							<>
								<div className={styles.title}>{film.title}</div>
								{user && (
									<>
										<button className={styles.deleteButton} onClick={() => handleDelete(film.id)}>
											Delete
										</button>
										<select
											className={styles.prioritySelect}
											value={film.priority || ''}
											onChange={(e) => updateFilmPriority(film.id, parseInt(e.target.value) || null)}
										>
											<option value="">Priority</option>
											<option value="1">Top 1</option>
											<option value="2">Top 2</option>
											<option value="3">Top 3</option>
											<option value="">None</option>
										</select>
									</>
								)}

							</>
						)}
					</div>
				</div>
			))}
		</div>
	);
};
