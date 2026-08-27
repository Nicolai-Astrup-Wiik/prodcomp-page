import React from 'react';
import styles from '../styles/AboutPage.module.css'; // Import CSS module
import { Link } from 'react-router-dom';

export const AboutPage = () => {
	return (
		<>
			<p className={styles.paragraph}>
				Pappenheimer er et produksjonsselskap som bærer samme navn som tidenes mest standhaftige feltmarskalk. Vi er her for å lage kompromissløst
				gode filmer over hele det ganske land, med fingerspitzgefühl og glimt i øyet.

				Produsent og våpendrager er <Link className={styles.linkButton} to="/contact">Ivan Jamne </Link>
				<br />
				<br />
				Pappenheimerne kjemper for kunden til siste sendekopi, og holder til i Maridalsveien 89.

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