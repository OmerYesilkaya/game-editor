import { SceneEntity } from "@core/store/types";
import { TextureInfo } from "types/texture";
import CustomSpriteMaterial from "../../core/materials/CustomSpriteMaterial";
import utils from "./utils";

type SceneState = {
    clock: number;
    dt: number;
    entities: SceneEntity[];
    textureInfos: TextureInfo[];
};

// Gets called 24 frames per second
function update(state: SceneState) {
    if (state.clock > 0.05) {
        for (let i = 0; i < state.entities.length; i++) {
            const entity = state.entities[i];
            const mat: any = entity.mat.current;
            if (entity.sprites.length === 0) {
                CustomSpriteMaterial.clearMaterialValues(mat);
                continue;
            }

            const sprite = entity.sprites[entity.spriteIndex % entity.sprites.length];
            if (entity.textureId != sprite.textureId) {
                entity.textureId = sprite.textureId;
                utils.setTexture(mat, entity.textureId, state.textureInfos);
            }
            CustomSpriteMaterial.setMaterialValues(mat, sprite);
            entity.spriteIndex++;
        }

        state.clock -= 0.05;
    }
}

export default update;
