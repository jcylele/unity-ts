import {LoadJson} from "../../CsUtil";

export interface BaseConfig {
}

export function LoadConfig<T extends BaseConfig>(path: string): Map<number, T> {
    const json_data = LoadJson(path)
    const keyName = json_data.key
    const map = new Map<number, T>()
    for (const data of json_data.data_list) {
        // @ts-ignore
        map.set(data[keyName], data)
    }
    return map
}