import React, { useState } from 'react';
import { FilmList } from '../components/FilmList'; // Import FilmList
import styles from '../styles/DirectorsPage.module.css'; // Ensure correct import

export const DirectorsPage = () => {
	// List of directors
	const directors = [
		{ name: 'Gaute Hesthagen', slug: 'gaute' },
		{ name: 'Sigve Aspelund', slug: 'sigve' },
		//{ name: 'Alexander Halvorsen', slug: 'alexander' },
		//{ name: 'Oskar Johansen', slug: 'oskar' },
		//{ name: 'Mauritz Brekke Solberg', slug: 'mauritz' }
	];

	const [selectedDirector, setSelectedDirector] = useState(null);

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
								{director.name}
							</button>
						</li>
					))}
				</ul>
			</aside>

			{/* Films List */}
			<section className={styles.filmListContainer}>
				{console.log("Selected Director:", selectedDirector)}
				<FilmList director={selectedDirector} isModalOpen={false} featuredOnly={false} />
			</section>
		</div>
	);
};
