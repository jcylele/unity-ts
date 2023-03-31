/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface IPanelConfigField extends IConfigField {

    readonly clsName: string

    readonly id: number

    readonly layer: number

    readonly prefab: string
}

export class PanelConfig extends BaseConfig {
    constructor(private readonly data: IPanelConfigField) {
        super()
    }

    get clsName(): string {
        return this.data.clsName
    }


    get id(): number {
        return this.data.id
    }


    get layer(): number {
        return this.data.layer
    }


    get prefab(): string {
        return this.data.prefab
    }

}

let _all_data: Map<number, PanelConfig> = undefined

export function GetPanelConfig(key: number): PanelConfig {
    if (!_all_data){
        _all_data = LoadConfig('PanelConfig', PanelConfig)
    }
    return _all_data.get(key)
}

