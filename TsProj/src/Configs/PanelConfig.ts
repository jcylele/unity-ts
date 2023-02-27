//TODO Temporary Implement

import {LoadJson} from "../CsUtil";

export interface PanelConfig {
    readonly id: number
    readonly clsName: string
    readonly prefab: string
    readonly layer: number
}

let _all_data: Map<number, PanelConfig> = undefined

export function GetPanelConfig(key: number): PanelConfig {
    if (!_all_data){
        const  json_data = LoadJson(`Config\\PanelConfig`)
        const keyName = json_data.key
        _all_data = new Map<number, PanelConfig>()
        for (const data of json_data.data) {
            // @ts-ignore
            _all_data.set(data[keyName], data)
        }
    }
    return _all_data.get(key)
}
 
 