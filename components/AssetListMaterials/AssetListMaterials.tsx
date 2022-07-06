import api from "api";
import { usePrefabEditorSelectedInput } from "hooks";

const Materials: React.FC = () => {
    const { data: materials } = api.useGetMaterials();
    const { updateInput } = usePrefabEditorSelectedInput();

    if (!materials) return null;

    function handleSelect(id: number) {
        updateInput(id);
    }

    return (
        <div className="flex flex-col gap-y-px">
            {materials.length > 0
                ? materials.map((material) => (
                      <button
                          type="button"
                          key={material.id}
                          className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                          title={material.name}
                          onClick={() => handleSelect(material.id)}
                      >
                          {material.name}
                      </button>
                  ))
                : "No materials found"}
        </div>
    );
};

export default Materials;
