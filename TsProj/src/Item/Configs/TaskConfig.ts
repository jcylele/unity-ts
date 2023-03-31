/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface ITaskConfigField extends IConfigField {

    readonly id: number

    readonly reward_id: number
}

export class TaskConfig extends BaseConfig {
    constructor(private readonly data: ITaskConfigField) {
        super()
    }

    get desc(): string {
        return GetText(`Task_desc_${this.data.id}`)
    }


    get id(): number {
        return this.data.id
    }


    get name(): string {
        return GetText(`Task_name_${this.data.id}`)
    }


    get reward_id(): number {
        return this.data.reward_id
    }

}

let _all_data: Map<number, TaskConfig> = undefined

export function GetTaskConfig(key: number): TaskConfig {
    if (!_all_data){
        _all_data = LoadConfig('TaskConfig', TaskConfig)
    }
    return _all_data.get(key)
}

