/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig} from "../Base/BaseConfig";

export interface HeroConfig extends BaseConfig {
    readonly attrs: number[]
	readonly icon: string
	readonly id: number
	readonly quality: number
}

let _all_data: Map<number, HeroConfig> = undefined

export function GetHeroConfig(key: number): HeroConfig {
    if (!_all_data){
        _all_data = LoadConfig('HeroConfig')
    }
    return _all_data.get(key)
}

