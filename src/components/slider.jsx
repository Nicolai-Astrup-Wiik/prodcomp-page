import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";

const SlideInComponent = ({ children }) => {

	return (

		<motion.div
			initial={{ x: "-100vw", opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: "-100vw", opacity: 0 }}
			transition={{ type: "tween", duration: 0.5, ease: "easeOut" }}
			className="p-4 bg-white shadow-lg rounded-lg"
		>
			{children}
		</motion.div>

	);
};

export default SlideInComponent;