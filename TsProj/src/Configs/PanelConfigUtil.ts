//TODO Temporary Implement

export type PanelConfig = {
    readonly id: number;
    readonly clsName: string
    readonly prefab: string;
    readonly layer: number;
}

const _all_data: Map<number, PanelConfig> = new Map([
    [1001, {
        id: 1001,
        clsName: "FirstPanel",
        prefab: "FirstPanel",
        layer: 2,
    }]
]);

export function GetPanelConfig(key: number): PanelConfig {
    return _all_data.get(key)
}
 
 