import {LoadJson} from "../../CsUtil";

export interface IConfigField {
}

export class BaseConfig {
}

export function LoadConfig<T extends BaseConfig>(path: string, Cls: { new(data: IConfigField): T }): Map<number, T> {
    const json_data = LoadJson(path)
    const keyName = json_data.key
    const map = new Map<number, T>()
    for (const data of json_data.data_list) {
        const obj = new Cls(data)
        map.set(data[keyName], obj)
    }
    return map
}