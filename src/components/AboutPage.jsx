import React from 'react';
import styles from '../styles/AboutPage.module.css'; // Import CSS module
import { Link } from 'react-router-dom';

export const AboutPage = () => {
	return (
		<>
			<p className={styles.paragraph}>
				Pappenheimer er et produksjonsselskap som bærer samme navn som tidenes mest standhaftige feltmarskalk,
				og vi er her for å mørne lattermuskler over det ganske land – med kompromissløshet, fingerspitzgefühl og glimt i øyet.

				Pappenheimerne som står klare for hyre er regissørene <Link className={styles.linkButton} to="/directors/gaute">Gaute Hesthagen</Link>, <Link className={styles.linkButton} to="/directors/sigve">Sigve Aspelund</Link> og regiduoen <Link className={styles.linkButton} ti="/directors/nico&links">Nico & Links</Link>.
				Produsent og våpendrager er <Link className={styles.linkButton} to="/contact">Ivan Jamne </Link> – en mann viden kjent for å stå støtt i feltmarskalkstøvlene uansett om produksjonsprosessen preges av solskinnsbris eller tett kuleregn.

				Hvorfor dukker Pappenheimer opp akkurat nå? Fordi humor er altfor alvorlig til å bli tatt lett på. Det norske markedet er overmodent for enda en solid dose kvalitetshumor.
				Er du i akutt behov for noe morsomt? En historie som fester seg som en kule i ryggen? Noe helt sjukt som får folk til å dele, le og huske? Da vet du hvem du skal ringe.

				En Pappenheimer kjemper som kjent for klienten til siste sendekopi.
				<br />
				<br />
				Pappenheimerene holder til i Maridalsveien 89

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