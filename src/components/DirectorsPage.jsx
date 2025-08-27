import React, { useState } from 'react';
import styles from '../styles/DirectorsPage.module.css'; // Ensure correct import
import { useNavigate, useParams } from 'react-router-dom';

const directors = [
	{ name: 'Gaute Hesthagen', slug: 'gaute' },
	{ name: 'Sigve Aspelund', slug: 'sigve' },
	{ name: 'Nico & Espen', slug: 'nico&links' },
	{ name: 'Liv Mari Mortensen', slug: 'livmari' },
	{ name: 'Kristoffer Klunk Nyborg', slug: 'kristofferklunknyborg' },
	{ name: 'Alf Løvvold', slug: 'alflovvold' },
	//{ name: 'Oskar Johansen', slug: 'oskar' },
	{ name: 'Mauritz Brekke Solberg', slug: 'mauritz' }
];
export const DirectorsPage = () => {
	const { director } = useParams()

	const navigate = useNavigate()
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
								onClick={() => {
									setSelectedDirector(director.slug)
									navigate(`/directors/${director.slug}`)
								}}
							>


								{director.name}

							</button>
						</li>
					))}
				</ul>
			</aside>

		</div>
	);
};
