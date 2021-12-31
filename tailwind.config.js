module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./layouts/**/*.{js,ts,jsx,tsx}"],
	theme: {
		fontFamily: {
			default: ["Kanit", "sans-serif"],
			input: ["Montserrat\\ Alternates", "sans-serif"],
		},
		extend: {},
	},
	corePlugins: {
		preflight: false,
	},
	plugins: [],
};
