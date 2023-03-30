/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface IHeroConfigField extends IConfigField {

    readonly attrs: number[]

    readonly icon: string

    readonly id: number

    readonly quality: number
}

export class HeroConfig extends BaseConfig {
    constructor(private readonly data: IHeroConfigField) {
        super()
    }

    get attrs(): number[] {
        return this.data.attrs
    }


    get desc(): string {
        return GetText(`Hero_desc_${this.data.id}`)
    }


    get icon(): string {
        return this.data.icon
    }


    get id(): number {
        return this.data.id
    }


    get name(): string {
        return GetText(`Hero_name_${this.data.id}`)
    }


    get quality(): number {
        return this.data.quality
    }

}

let _all_data: Map<number, HeroConfig> = undefined

export function GetHeroConfig(key: number): HeroConfig {
    if (!_all_data){
        _all_data = LoadConfig('HeroConfig', HeroConfig)
    }
    return _all_data.get(key)
}

