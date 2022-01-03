import { useEffect } from "react";

import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

import { Footer, Navbar } from "@app/components";
import { useTextureStore, useAnimationStore, useSpriteStore } from "@app/store";

import Player from "public/assets/images/Player.png";
import { MOCK_DATA } from "./constants";

const AppWrapper: NextPage = ({ children }) => {
	const router = useRouter();
	const isInPrefabCreator = router.pathname === "/prefab-creator";

	const setRawTextures = useTextureStore((state) => state.setRawTextures);
	const setAnimations = useAnimationStore((state) => state.setAnimations);
	const setSprites = useSpriteStore((state) => state.setSprites);

	const ANIMATION_2 = { ...MOCK_DATA.IDLE_ANIMATION, id: "diffrenet-id", name: "idle-2" };
	useEffect(() => {
		setRawTextures([{ id: "37d25c3149f6ce44aafbf5917079cf20", texture: Player }]);
		setAnimations([MOCK_DATA.IDLE_ANIMATION, ANIMATION_2]);
		setSprites(MOCK_DATA.SPRITES);
	}, []);

	return (
		<div className="flex flex-col h-screen background-pattern">
			{!isInPrefabCreator && <Navbar />}
			<main className="flex flex-auto overflow-y-auto">{children}</main>
			{!isInPrefabCreator && <Footer />}
		</div>
	);
};

export default AppWrapper;
