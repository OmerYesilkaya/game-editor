import api from "api";
import { usePrefabEditorSelectedInput } from "hooks";

const MaterialAnimations: React.FC = () => {
    const { data: materialAnimations } = api.useGetMaterialAnimations();
    const { updateInput } = usePrefabEditorSelectedInput();

    if (!materialAnimations) return null;

    function handleSelect(id: number) {
        updateInput(id);
    }

    return (
        <div className="flex flex-col gap-y-px">
            {materialAnimations.length > 0
                ? materialAnimations.map((materialAnimation) => (
                      <button
                          type="button"
                          key={materialAnimation.id}
                          className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                          title={materialAnimation.name}
                          onClick={() => handleSelect(materialAnimation.id)}
                      >
                          {materialAnimation.name}
                      </button>
                  ))
                : "No material animations founds"}
        </div>
    );
};

export default MaterialAnimations;
