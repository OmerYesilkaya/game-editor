import api from "api";
import { usePrefabEditorSelectedInput } from "hooks";

const TrailSystems: React.FC = () => {
    const { data: trailSystems } = api.useGetTrailSystems();
    const { updateInput } = usePrefabEditorSelectedInput();

    if (!trailSystems) return null;

    function handleSelect(id: number) {
        updateInput(id);
    }

    return (
        <div className="flex flex-col gap-y-px">
            {trailSystems.length > 0
                ? trailSystems.map((trailSystem) => (
                      <button
                          type="button"
                          key={trailSystem.id}
                          className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                          title={trailSystem.name}
                          onClick={() => handleSelect(trailSystem.id)}
                      >
                          {trailSystem.name}
                      </button>
                  ))
                : "No trail systems found"}
        </div>
    );
};

export default TrailSystems;
