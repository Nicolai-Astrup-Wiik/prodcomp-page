import React from 'react';
import styles from '../styles/AboutPage.module.css'; // Import CSS module

export const AboutPage = () => {
	return (
		<>
			<p className={styles.paragraph} style={{ whiteSpace: "pre-line" }}>
				{/*{"\"Ich kenne meine Pappenheimer\" sa Wallenstein i Schillers drama – og nå vet hele Norge hva han mente. Velkommen til Pappenheimer – filmproduksjonsselskapet som vet hva du tenker før du tenker det selv!\n\nVi har gjenopplivet arven etter den legendariske generalfeltmarskalk Gottfried Heinrich von Pappenheim - vi er kanskje ikke like krigerske, men absolutt like kompromissløse på kvalitet, bare med litt færre sverd involvert.\n\n«Jeg kjenner mine pappenheimere\" - altså du vet hvor du har oss: Forvent det uventede. Forvent det briljante. Forvent at vi leverer filmer som får selv den mest stoiske tilskuer til å heve et øyebryn i begeistring.\n\nSå hvis du lurer på hva vi driver med, eller om du vil «drive» med oss (vi regner allerede med at du vil det – vi kjenner våre pappenheimere), ta kontakt med Ivan eller stikk innom hovedkvarteret vårt i Maridalsveien 89. Bare spør etter \"de der Pappenheimer-folka\" – vi lover at vi ikke biter. Med mindre du ber pent om det. Eventuelt kan du plinge en mail til "}*/}
				<a href="mailto:ivan@pappenheimer.no">Ivan</a>
			</p>
		</>
	);
};