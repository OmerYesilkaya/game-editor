export enum ModuleValueType {
    Object = 0,
    Range,
    Color,
    Animation, // Asset
    Sprite, // Asset
    Percentage,
    Vec2,
    Vec3,
    Vec4,
    Nested, // Deprecated
    Bool,
    Number,
    Text,
    TextArea,
    Material, // Asset
    ParticleSystem, // Asset
    TrailSystem, // Asset
    Audio, // Asset
    Prefab, // Asset
    ItemPool, // Asset
    StatusEffect,
    SpawnPrefab, // Refer to Spawnable.cs
    SkillSpawnPrefab, // Refer to Spawnable.cs
    MaterialAnimation, // Asset
}

export type Module = {
    name: string;
    id: number;
    children: Module[] | null;
    valueType: ModuleValueType;
    value: any | null;
    isCollapsed: boolean;
    prefabInternalId: string;
};

export type ApiModule = {
    name: string;
    id: number;
    children: ApiModule[] | null;
    valueType: ModuleValueType;
    value: any | null;
    isArray: boolean;
    arrayIndex: number;
    parentId: number;
};
