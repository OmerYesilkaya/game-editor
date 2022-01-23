import { ApiModule, Input, Prefab } from "@app/types";

// gets furthest branching modules of prefab
function getModuleInputs(modules: ApiModule[]) {
	const processingQueue: ApiModule[] = [];
	const moduleInputs: Input[] = [];

	modules.forEach((module) => {
		processingQueue.push(module);
	});

	while (processingQueue.length > 0) {
		const module = processingQueue.pop();
		module?.children?.forEach((child) => {
			if (child.children) {
				processingQueue.push(child);
			} else {
				moduleInputs.push({ id: child.id, value: child.value, valueType: child.valueType });
			}
		});
	}

	return moduleInputs;
}

function findPrefabInTree(internalId: string, prefab: Prefab): Prefab | null {
	if (internalId === prefab.internalId) return prefab;
	if (!prefab.children) return null;

	for (let i = 0; i < prefab.children.length; i++) {
		const child = prefab.children[i];
		const result = findPrefabInTree(internalId, child);
		if (!result) return result;
	}

	return null;
}

export default { getModuleInputs, findPrefabInTree };
