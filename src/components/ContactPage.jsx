import React from 'react'
import styles from "../styles/ContactPage.module.css"
const ContactPage = () => {
	return (<div className={styles.contactCardContainer}>

		<div className={styles.contactCard}>
			<div className={styles.contactTitle}>Ivan Jamne</div>
			<div>Produsent</div>
			<div>+47 407 18 976</div>
			<div>	ivan@pappenheimer.no</div>
		</div>

		<div className={styles.contactCard}>
			<div className={styles.contactTitle}>Beril Holte Rasmussen</div>
			<div>Backoffice</div>
			<div>+47 952 02 590</div>
			<div>	beril@pappenheimer.no</div>
		</div>

	</div>
	)
}

export default ContactPage