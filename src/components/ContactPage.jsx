import React from 'react'
import styles from "../styles/ContactPage.module.css"
const ContactPage = () => {
	return (<div className={styles.contactCardContainer}>

		<div className={styles.contactCard}>
			<div className={styles.contactTitle}>Ivan Jamne</div>
			<div>Produsent</div>
			<div>+47 407 18 976</div>
			<a href="mailto:ivan@pappenheimer.no">ivan@pappenheimer.no</a>
		</div>
		{<div className={styles.contactCard}>
			<div className={styles.contactTitle}>Gaute Hesthagen</div>
			{/*<div>Backoffice</div>*/}
			<div>+47 908 81 039</div>
			<a href="mailto:gaute@pappenheimer.no">gaute@pappenheimer.no</a>
		</div>}

		{/*<div className={styles.contactCard}>
			<div className={styles.contactTitle}>Beril Holte Rasmussen</div>
			<div>Backoffice</div>
			<div>+47 952 02 590</div>
			<a href="mailto:beril@pappenheimer.no">beril@pappenheimer.no</a>
		</div>*/}

	</div>
	)
}

export default ContactPage