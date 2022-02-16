import ReactFlow, { Background, BackgroundVariant, Elements } from "react-flow-renderer";

import { usePrefabEditorStore } from "@core/store";
import { Prefab } from "@app/types";

import TreeNode from "./TreeNode";
import shallow from "zustand/shallow";
import editorUtils from "@prefab-editor/editorUtils";

function generateReactFlowElements(prefab: Prefab | null): Elements {
    if (!prefab) return [];
    return editorUtils.getPrefabChildren(prefab).map((node) => ({
        id: node.prefab.internalId,
        type: "prefab",
        position: node.prefab.position,
        data: {
            name: node.prefab.name,
            modules: node.prefab.modules,
            id: node.prefab.id,
            internalId: node.prefab.internalId,
            source: node.parentId,
            target: "",
        },
        dragHandle: "#drag-handle",
    }));
}
const Canvas: React.FC = () => {
    const { root, clearSelection } = usePrefabEditorStore((state) => ({ root: state.rootPrefab, clearSelection: state.clearSelection }), shallow);
    const elements = generateReactFlowElements(root);

    return (
        <div id="react-flow-container" className="w-full border-r border-white">
            <ReactFlow
                elements={elements}
                nodeTypes={{ prefab: TreeNode }}
                onPaneClick={() => {
                    clearSelection();
                }}
            >
                <Background variant={BackgroundVariant.Dots} gap={24} size={1} color="rgb(39,39,42)" />
            </ReactFlow>
        </div>
    );
};

export default Canvas;
