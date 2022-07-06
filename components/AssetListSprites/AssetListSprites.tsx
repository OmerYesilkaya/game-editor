import { PhotographIcon } from "@heroicons/react/outline";

import { usePrefabEditorStore } from "@app/store";
import { usePrefabEditorSelectedInput } from "@app/hooks";
import api from "@app/api";

type Props = {
    query: string;
};

const Sprites: React.FC<Props> = ({ query }) => {
    const setTemporaryPreview = usePrefabEditorStore((state) => state.setTemporaryPreview);
    const setActivePreview = usePrefabEditorStore((state) => state.setActivePreview);

    const { updateInput } = usePrefabEditorSelectedInput();

    const { data: sprites, isLoading: isSpritesLoading } = api.useGetSprites();
    if (!sprites) return null;

    function handleSelect(id: number) {
        const preview = sprites!.find((sprite) => sprite.id === id);
        if (!preview) return;
        setActivePreview(preview);
        updateInput(id);
    }

    function handlePointerEnter(id: number) {
        const preview = sprites!.find((sprite) => sprite.id === id);
        if (!preview) return;
        setTemporaryPreview(preview);
    }

    function handlePointerOut() {
        setTemporaryPreview(null);
    }

    const filteredSprites = sprites.filter((sprite) => {
        return sprite.name.toLowerCase().includes(query.toLowerCase());
    });

    return (
        <div className="flex flex-col gap-y-px grow">
            {filteredSprites.length > 0 ? (
                filteredSprites.map((sprite) => (
                    <button
                        type="button"
                        key={sprite.id}
                        className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                        title={sprite.name}
                        onClick={() => handleSelect(sprite.id)}
                        onPointerEnter={() => handlePointerEnter(sprite.id)}
                        onPointerOut={() => handlePointerOut()}
                    >
                        {sprite.name}
                    </button>
                ))
            ) : (
                <div className="grow flex items-center justify-center flex-col gap-y-1">
                    <h2 className="uppercase text-xl font-bold">No sprite found</h2>
                    <PhotographIcon className="w-12 h-12" />
                </div>
            )}
        </div>
    );
};

export default Sprites;
