import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import { Common, PrefabScene } from "components";
import api from "api";

const SceneCanvas = dynamic(() => import("../../components/PrefabSceneCanvas"), {
    ssr: false,
});

const Container: React.FC = () => {
    const { data: animations } = api.useGetAnimations();
    const { data: sprites } = api.useGetSprites();
    const [show, setShow] = useState(false);

    useEffect(() => {
        // Since Canvas is a client side component, it takes more time to load then other components.
        // We are showing a loader until client side is loaded with this useEffect
        setShow(true);
    }, []);

    return (
        <div className="relative flex flex-col w-2/3 h-full canvas-pattern">
            <PrefabScene.Toolbar />
            <Common.Loading show={show} setShow={setShow} /> <SceneCanvas animations={animations!} sprites={sprites!} />
        </div>
    );
};

export default Container;
