/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface IAdventureConfigField extends IConfigField {

    readonly stage: number

    readonly task_ids: number[]
}

export class AdventureConfig extends BaseConfig {
    constructor(private readonly data: IAdventureConfigField) {
        super()
    }

    get desc(): string {
        return GetText(`Adventure_desc_${this.data.stage}`)
    }


    get name(): string {
        return GetText(`Adventure_name_${this.data.stage}`)
    }


    get stage(): number {
        return this.data.stage
    }


    get task_ids(): number[] {
        return this.data.task_ids
    }

}

let _all_data: Map<number, AdventureConfig> = undefined

export function GetAdventureConfig(key: number): AdventureConfig {
    if (!_all_data){
        _all_data = LoadConfig('AdventureConfig', AdventureConfig)
    }
    return _all_data.get(key)
}

