import {EItemType} from "../../Define/ItemDefine";
import {BaseConfig} from "./BaseConfig";

export abstract class BaseAttr {
    toString(): string {
        // const dict = {}
        // for (const key of Object.keys(this)) {
        //     dict[key] = this[key]
        // }
        return JSON.stringify(this)
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

