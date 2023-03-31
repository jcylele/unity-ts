/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseConfig, LoadConfig, IConfigField} from "../Base/BaseConfig";
import {GetText} from "../../Common/Text";

export interface IRewardConfigField extends IConfigField {

    readonly id: number

    readonly reward_items: number[][]
}

export class RewardConfig extends BaseConfig {
    constructor(private readonly data: IRewardConfigField) {
        super()
    }

    get id(): number {
        return this.data.id
    }


    get reward_items(): number[][] {
        return this.data.reward_items
    }

}

let _all_data: Map<number, RewardConfig> = undefined

export function GetRewardConfig(key: number): RewardConfig {
    if (!_all_data){
        _all_data = LoadConfig('RewardConfig', RewardConfig)
    }
    return _all_data.get(key)
}

