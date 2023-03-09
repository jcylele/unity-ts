import {EItemType} from "../../Define/ItemDefine";
import {BaseConfig} from "./BaseConfig";

export abstract class BaseAttr {
    protected readonly _owner: BaseItem

    protected constructor(owner: BaseItem) {
        this._owner = owner
    }

    toString(): string {
        const str_list: string[] = []
        Object.entries(this)
            .forEach(([key, value]) => {
                if (key != '_owner'){
                    str_list.push(`${key}: ${value}`)
                }
            })
        return str_list.join(' | ')
    }
}

export abstract class BaseItem {
    /**
     * dynamic attributes of item, usually from server
     */
    readonly base: BaseAttr
    /**
     * static(const) attributes of item, usually configured in json files
     */
    readonly config?: BaseConfig;

    /**
     * type of item
     */
    public get ItemType(): EItemType {
        return EItemType.None
    }

    /**
     * unique key of the item
     */
    abstract get Key(): number

    toString(): string {
        return `${EItemType[this.ItemType]} ${this.base}`;
    }
}

