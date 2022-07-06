import shallow from "zustand/shallow";
import { FilmIcon } from "@heroicons/react/outline";

import { usePrefabEditorStore } from "@app/store";
import { usePrefabEditorSelectedInput } from "@app/hooks";
import api from "@app/api";

type Props = {
    query: string;
};

const Animations: React.FC<Props> = ({ query }) => {
    const { data: animations } = api.useGetAnimations();
    const { data: sprites } = api.useGetSprites();

    const { setActivePreview, setTemporaryPreview } = usePrefabEditorStore(
        (state) => ({ setActivePreview: state.setActivePreview, setTemporaryPreview: state.setTemporaryPreview }),
        shallow
    );
    const { updateInput } = usePrefabEditorSelectedInput();

    if (!animations || !sprites) return null;

    function handleSelect(id: number) {
        const animation = animations!.find((animation) => animation.id === id);
        if (!animation) return;
        const preview = sprites!.filter((sprite) => animation.sprites.includes(sprite.id));
        if (!preview) return;
        setActivePreview(preview);
        updateInput(id);
    }

    function handlePointerEnter(id: number) {
        const animation = animations!.find((animation) => animation.id === id);
        if (!animation) return;
        const preview = sprites!.filter((sprite) => animation.sprites.includes(sprite.id));
        if (!preview) return;
        setTemporaryPreview(preview);
    }

    function handlePointerOut() {
        setTemporaryPreview(null);
    }

    const filteredAnimations = animations.filter((animation) => {
        return animation.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className="flex flex-col gap-y-px grow">
            {filteredAnimations.length > 0 ? (
                filteredAnimations.map((animation) => (
                    <button
                        type="button"
                        key={animation.id}
                        className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                        title={animation.name}
                        onClick={() => handleSelect(animation.id)}
                        onPointerEnter={() => handlePointerEnter(animation.id)}
                        onPointerOut={() => handlePointerOut()}
                    >
                        {animation.name}
                    </button>
                ))
            ) : (
                <div className="grow flex items-center justify-center flex-col gap-y-1">
                    <h2 className="uppercase text-xl font-bold">No animation found</h2>
                    <FilmIcon className="w-12 h-12" />
                </div>
            )}
        </div>
    );
};

export default Animations;
