import React, { useState } from 'react';
import { FilmList } from '../components/FilmList'; // Import FilmList
import styles from '../styles/DirectorsPage.module.css'; // Ensure correct import
import { useLocation, useParams } from 'react-router-dom';

const directors = [
	{ name: 'Gaute Hesthagen', slug: 'gaute' },
	{ name: 'Sigve Aspelund', slug: 'sigve' },
	{ name: 'Alexander Halvorsen', slug: 'alexander' },
	//{ name: 'Oskar Johansen', slug: 'oskar' },
	//{ name: 'Mauritz Brekke Solberg', slug: 'mauritz' }
];
export const DirectorsPage = () => {
	const { director } = useParams()
	// List of directors

	const [selectedDirector, setSelectedDirector] = useState(director ? directors.find(d => d.slug === director)?.slug : null);

	return (
		<div className={styles.pageContainer}>
			{/* Sidebar with Directors */}
			<aside className={styles.sidebar}>
				<ul className={styles.directorsList}>
					{directors.map((director) => (
						<li key={director.slug}>
							<button
								className={`${styles.directorButton} ${selectedDirector === director.slug ? styles.active : ''
									}`}
								onClick={() => setSelectedDirector(director.slug)}
							>
								<a style={{ textDecoration: "none" }}
									className={`${styles.directorButton} ${selectedDirector === director.slug ? styles.active : ''
										}`} href={`/directors/${director.slug}`}>

									{director.name}
								</a>
							</button>
						</li>
					))}
				</ul>
			</aside>

		</div>
	);
};
