import React from 'react';
import styles from '../styles/AboutPage.module.css'; // Import CSS module

export const AboutPage = () => {
	return (
		<>
			<p className={styles.paragraph}>
				Hvis du lurer på hva vi driver med eller om du vil drive med oss, ta kontakt med{' '}
				<a href="mailto:ivan@pappenheimer.no">Ivan</a> eller dra innom Sørkedalsveien 89 og spør etter oss...
			</p>
		</>
	);
};