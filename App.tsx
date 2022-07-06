import React from "react";

import { NextPage } from "next";

import { RawTexture } from "@app/types";
import { URL } from "@core/constants";
import { usePrefabEditorStore } from "@core/store";

import api from "api";

async function loadTextures(textures: { id: number; name: string }[]) {
    const rawTextures = [] as RawTexture[];
    textures.forEach((texture) =>
        fetch(URL.TEXTURES + `/${texture.id}`, {
            method: "GET",
        })
            .then((result) => result.blob())
            .then((data) => {
                var reader = new FileReader();
                reader.readAsDataURL(data);
                reader.onload = function (e) {
                    const addTexture = usePrefabEditorStore.getState().addTexture;
                    addTexture({ id: texture.id, texture: e?.target?.result ?? null });
                };
            })
    );

    return rawTextures;
}

const AppWrapper: NextPage = ({ children }) => {
    // Load assets on app launch to prevent
    // interruptions while using the app later on
    const { isLoading: areTexturesLoading } = api.useGetTextures({
        onSuccess: (data) => {
            loadTextures(data);
        },
    });
    const {} = api.useGetSprites({
        onSuccess: (data) => {
            const loadSprites = usePrefabEditorStore.getState().loadSprites;
            loadSprites(data);
        },
    });
    const {} = api.useGetAnimations({
        onSuccess: (data) => {
            const loadAnimations = usePrefabEditorStore.getState().loadAnimations;
            loadAnimations(data);
        },
    });

    return (
        <div className="flex flex-col h-screen">
            {areTexturesLoading && (
                <>
                    <div className="w-screen h-screen bg-black opacity-80 flex items-center justify-center fixed inset-0 z-[21] " />
                    <div className="z-[22] fixed inset-0 flex items-center justify-center text-white h-screen w-screen font-default text-4xl font-black select-none">
                        LOADING...
                    </div>
                </>
            )}
            <main className="flex flex-auto overflow-y-auto">{children}</main>
        </div>
    );
};

export default AppWrapper;
