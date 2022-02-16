import { ModuleValueType } from ".";

export type Input = {
    rootModuleId: number;
    id: number;
    value: any;
    valueType: ModuleValueType;
};
