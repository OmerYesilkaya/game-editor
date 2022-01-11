// hooks
import useGetAnimations from "./useGetAnimations";
import useGetModuleById from "./useGetModuleById";
import useGetModules from "./useGetModules";
import useGetPrefabById from "./useGetPrefabById";
import useGetPrefabs from "./useGetPrefabs";
import useGetSprites from "./useGetSprites";
import useGetTextureById from "./useGetTextureById";
import useGetTextures from "./useGetTextures";
import usePostPrefab from "./usePostPrefab";

//functions
import { getModuleById } from "./useGetModuleById";

export default {
	// hooks
	useGetAnimations,
	useGetModuleById,
	useGetModules,
	useGetPrefabById,
	useGetPrefabs,
	useGetSprites,
	useGetTextureById,
	useGetTextures,
	usePostPrefab,

	// functions
	getModuleById,
};
