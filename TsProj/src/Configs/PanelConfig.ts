import {LoadJson} from "../CsUtil";

export interface PanelConfig{
    readonly clsName: string
	readonly id: number
	readonly layer: number
	readonly prefab: string
}

let _all_data: Map<number, PanelConfig> = undefined

export function GetPanelConfig(key: number): PanelConfig {
    if (!_all_data){
        const  json_data = LoadJson(`PanelConfig`)
        const keyName = json_data.key
        _all_data = new Map<number, PanelConfig>()
        for (const data of json_data.data_list) {
            // @ts-ignore
            _all_data.set(data[keyName], data)
        }
    }
    return _all_data.get(key)
}

