import { useState, useEffect } from "react";

type WindowSizeReturnTypes = {
	width: undefined | number;
	height: undefined | number;
};

function useWindowSize(): WindowSizeReturnTypes {
	const [windowSize, setWindowSize] = useState<WindowSizeReturnTypes>({
		width: undefined,
		height: undefined,
	});

	useEffect(() => {
		function handleResize() {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return windowSize;
}

export default useWindowSize;
