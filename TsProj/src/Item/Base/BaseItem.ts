import {EItemType} from "../../Define/ItemDefine";
import {BaseConfig} from "./BaseConfig";
import {BaseCachedValue} from "./AttrCache";
import {ObserverContainer} from "./ObserverContainer";
import {GetBag} from "../../Mgrs/ItemMgr";

/**
 * item callback function delegate(type define)
 */
export type ItemObserverFunc = (itemType: EItemType, itemKey: number) => void

export abstract class BaseAttr {
    protected readonly _owner: BaseItem
    get Owner(): BaseItem {
        return this._owner
    }

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

    private readonly _cached : BaseCachedValue[] = []

    private readonly _observers: ObserverContainer<ItemObserverFunc> = new ObserverContainer<ItemObserverFunc>()

    get Observers(): ObserverContainer<ItemObserverFunc> {
        return this._observers
    }

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

    /**
     * base attribute is changed, invalidate all cached values and notify bag
     */
    _OnAttrChanged() {
        //invalidate attr cache
        this._cached.forEach((value, key) => {
            value.Invalidate();
        });
        //notify bag
        GetBag(this.ItemType).OnItemChanged(this);
    }

    _AddCachedValue(value: BaseCachedValue) {
        this._cached.push(value)
    }

    toString(): string {
        return `${EItemType[this.ItemType]} ${this.base}`;
    }
}

