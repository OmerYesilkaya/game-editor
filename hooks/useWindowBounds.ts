import { useEffect, useState } from "react";

type Bounds = { left: number; right: number; top: number; bottom: number };

function useWindowBounds(): Bounds {
	const [bounds, setBounds] = useState<Bounds>({ left: 0, right: 0, top: 0, bottom: 0 });

	useEffect(() => {
		function updateBounds() {
			setBounds({
				left: -window.innerWidth / 2,
				top: -window.innerHeight / 2,
				right: window.innerWidth / 2,
				bottom: window.innerHeight / 2,
			});
		}
		window.addEventListener("resize", updateBounds);

		updateBounds();

		return () => window.removeEventListener("resize", updateBounds);
	}, []);

	return bounds;
}

export default useWindowBounds;
