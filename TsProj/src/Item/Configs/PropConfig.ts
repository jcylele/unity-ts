/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface IPropConfigField extends IConfigField {

    readonly icon: string

    readonly id: number

    readonly quality: number
}

export class PropConfig extends BaseConfig {
    constructor(private readonly data: IPropConfigField) {
        super()
    }

    get desc(): string {
        return GetText(`Prop_desc_${this.data.id}`)
    }


    get icon(): string {
        return this.data.icon
    }


    get id(): number {
        return this.data.id
    }


    get name(): string {
        return GetText(`Prop_name_${this.data.id}`)
    }


    get quality(): number {
        return this.data.quality
    }

}

let _all_data: Map<number, PropConfig> = undefined

export function GetPropConfig(key: number): PropConfig {
    if (!_all_data){
        _all_data = LoadConfig('PropConfig', PropConfig)
    }
    return _all_data.get(key)
}

