import { ModuleValueType } from "@app/types";
import { StatusEffect } from "types/enums";

export default {
    [ModuleValueType.Animation]: null,
    [ModuleValueType.Bool]: false,
    [ModuleValueType.Color]: "#ffffff",
    [ModuleValueType.Nested]: null,
    [ModuleValueType.Number]: 0,
    [ModuleValueType.Object]: null,
    [ModuleValueType.Percentage]: 0.5,
    [ModuleValueType.Range]: [0.3, 0.4],
    [ModuleValueType.Sprite]: null,
    [ModuleValueType.Text]: "",
    [ModuleValueType.TextArea]: "",
    [ModuleValueType.Vec2]: { x: 0, y: 0 },
    [ModuleValueType.Vec3]: { x: 0, y: 0, z: 0 },
    [ModuleValueType.Vec4]: { x: 0, y: 0, z: 0, w: 0 },
    [ModuleValueType.Material]: null,
    [ModuleValueType.ParticleSystem]: null,
    [ModuleValueType.TrailSystem]: null,
    [ModuleValueType.Audio]: null,
    [ModuleValueType.Prefab]: null,
    [ModuleValueType.ItemPool]: null,
    [ModuleValueType.StatusEffect]: StatusEffect.None,
    [ModuleValueType.SpawnPrefab]: { prefab: null, offset: { x: 0, y: 0, z: 0, w: 0 } },
    [ModuleValueType.SkillSpawnPrefab]: { prefab: null, offset: { x: 0, y: 0, z: 0, w: 0 }, isProtected: false },
    [ModuleValueType.MaterialAnimation]: null,
};
