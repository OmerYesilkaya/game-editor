module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./core/**/*.{js,ts,jsx,tsx}", "./features/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			default: ["Kanit", "sans-serif"],
			input: ["Montserrat\\ Alternates", "sans-serif"],
		},
		extend: {
			backgroundColor: {
				zinc: {
					dark: "#0c0b0e",
				},
			},
		},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
};
