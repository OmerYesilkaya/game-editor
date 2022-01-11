import { ApiModule, Input } from "@app/types";

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

export default { getModuleInputs };
