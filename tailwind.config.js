const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		fontFamily: {
			default: ["Kanit", "sans-serif"],
		},
		extend: {
			colors: {
				gray: colors.blueGray,
				red: colors.red,
				yellow: colors.amber,
			},
		},
	},
	variants: {
		extend: {
			backgroundColor: ["active"],
			brightness: ["active"],
			brightness: ["hover"],
		},
	},
	plugins: [],
};
