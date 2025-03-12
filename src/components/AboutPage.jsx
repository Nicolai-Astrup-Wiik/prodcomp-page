import React from 'react';
import styles from '../styles/AboutPage.module.css'; // Import CSS module

export const AboutPage = () => {
	return (
		<>
			<p className={styles.paragraph}>
				Pappenheimer ble etablert i 2025, og vårt hovedfokus er å lage sterke reklamefilmer med kompromissløs kvalitet.
				Hvis du vil jobbe med oss, ta kontakt med produsent <a href="mailto:ivan@pappenheimer.no">Ivan Jamne </a>, eller dra innom oss i Maridalsveien 89 og spør etter Pappenheimerne.
				<br></br>
				<br></br>
				<p className={styles.paragraphItalic} >
					<h3>Pappenheimer (substantiv):</h3>
					En som man kjenner godt og vet hvordan vil opptre; en person man vet hvor man har.
					Fra tysk Pappenheimer, avledet av slektsnavnet Pappenheim (jf. suffikset -er), opprinnelig betegnelse for lojal og hardtarbeidende soldat under feltherre Gottfried Heinrich greve av Pappenheim (1594–1632), en legendarisk generalfeltmarskalk.
				</p>
			</p>
		</>
	);
};