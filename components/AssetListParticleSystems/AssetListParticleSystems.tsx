import api from "api";
import { usePrefabEditorSelectedInput } from "hooks";

const ParticleSystems: React.FC = () => {
    const { data: particleSystems } = api.useGetParticleSystems();
    const { updateInput } = usePrefabEditorSelectedInput();

    if (!particleSystems) return null;

    function handleSelect(id: number) {
        updateInput(id);
    }

    return (
        <div className="flex flex-col gap-y-px">
            {particleSystems.length > 0
                ? particleSystems.map((particleSystem) => (
                      <button
                          type="button"
                          key={particleSystem.id}
                          className="flex px-1 rounded-sm transition bg-zinc-800 hover:brightness-125 whitespace-nowrap truncate"
                          title={particleSystem.name}
                          onClick={() => handleSelect(particleSystem.id)}
                      >
                          {particleSystem.name}
                      </button>
                  ))
                : "No particle systems found"}
        </div>
    );
};

export default ParticleSystems;
