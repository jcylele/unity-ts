/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig} from "../Base/BaseConfig";

export interface PropConfig extends BaseConfig {
    readonly icon: string
	readonly id: number
	readonly price: number
	readonly quality: number
}

let _all_data: Map<number, PropConfig> = undefined

export function GetPropConfig(key: number): PropConfig {
    if (!_all_data){
        _all_data = LoadConfig('PropConfig')
    }
    return _all_data.get(key)
}

