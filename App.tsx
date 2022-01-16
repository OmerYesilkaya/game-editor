import React, { SetStateAction, useEffect, useState } from "react";

import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

import { Footer, Navbar } from "@app/components";
import { useTextureStore, useAssetStore } from "@app/store";
import { RawTexture } from "@app/types";
import { api } from "@app/hooks";
import { URL } from "@app/constants";

async function loadTextures(textures: { id: number; name: string }[], setFiles: React.Dispatch<SetStateAction<RawTexture[]>>) {
	const rawTextures = [] as RawTexture[];
	textures.forEach((texture) =>
		fetch(URL.TEXTURES + `/${texture.id}`, {
			method: "GET",
		})
			.then((result) => result.blob())
			.then((data) => {
				var reader = new FileReader();
				reader.onload = function (e) {
					setFiles((prev) => [...prev, { id: texture.id, texture: e?.target?.result ?? null }]);
				};
				reader.readAsDataURL(data);
			})
	);

	return rawTextures;
}

const AppWrapper: NextPage = ({ children }) => {
	const router = useRouter();
	const isInPrefabCreator = router.pathname === "/prefab-creator";
	const [files, setFiles] = useState<RawTexture[]>([]);

	const setRawTextures = useTextureStore((state) => state.setRawTextures);
	const { setAnimations, setSprites } = useAssetStore((state) => ({ setAnimations: state.setAnimations, setSprites: state.setSprites }));

	const { isLoading: areTexturesLoading } = api.useGetTextures({
		onSuccess: (data) => {
			loadTextures(data, setFiles);
		},
	});

	const { isLoading: areSpritesLoading } = api.useGetSprites({
		onSuccess: (data) => {
			setSprites(data);
		},
	});

	const { isLoading: areAnimationLoading } = api.useGetAnimations({
		onSuccess: (data) => {
			setAnimations(data);
		},
	});

	useEffect(() => {
		setRawTextures(files);
	}, [files]);

	return (
		<div className="flex flex-col h-screen">
			{(areAnimationLoading || areSpritesLoading || areTexturesLoading) && (
				<>
					<div className="w-screen h-screen bg-black opacity-80 flex items-center justify-center fixed inset-0 z-[21] " />
					<div className="z-[22] fixed inset-0 flex items-center justify-center text-white h-screen w-screen font-default text-4xl font-black select-none">
						LOADING...
					</div>
				</>
			)}
			{!isInPrefabCreator && <Navbar />}
			<main className="flex flex-auto overflow-y-auto">{children}</main>
			{!isInPrefabCreator && <Footer />}
		</div>
	);
};

export default AppWrapper;
