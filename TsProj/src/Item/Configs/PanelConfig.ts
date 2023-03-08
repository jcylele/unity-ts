/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig} from "../Base/BaseConfig";

export interface PanelConfig extends BaseConfig {
    readonly clsName: string
	readonly id: number
	readonly layer: number
	readonly prefab: string
}

let _all_data: Map<number, PanelConfig> = undefined

export function GetPanelConfig(key: number): PanelConfig {
    if (!_all_data){
        _all_data = LoadConfig('PanelConfig')
    }
    return _all_data.get(key)
}

