import {BaseItem} from "./BaseItem";
import {EItemType} from "../../Define/ItemDefine";
import {OnBagItemChanged} from "../../Mgrs/ItemMgr";
import {ObserverContainer} from "./ObserverContainer";

type BaseItemComparer = (a: BaseItem, b: BaseItem) => number;

/**
 * callback function for bag updating(type define)
 */
export type BagObserveFunc = (itemType: EItemType) => void

export default class BaseBag {
    constructor(private readonly itemType: EItemType) {
    }

    /**
     * item dict, key is key, value is subclass of BaseItem
     */
    private readonly _items = new Map<number, BaseItem>();

    /**
     * cache sorted key list
     */
    private _itemKeys?: number[];

    /**
     * sort function, sort by key if this is undefined
     */
    private _compareFunc?: BaseItemComparer;

    private readonly _observers: ObserverContainer<BagObserveFunc> = new ObserverContainer<BagObserveFunc>()

    get Observers(): ObserverContainer<BagObserveFunc> {
        return this._observers
    }

    /**
     * add item
     * @param item
     */
    Add(item: BaseItem) {
        let key = item.Key;
        if (this._items.has(key)) {
            throw new Error(`Item(key:${key}) already exist in Bag`);
        }
        this._items.set(key, item);
        this.OnItemChanged(item);
    }

    /**
     * remove item
     * @param item
     */
    Remove(item: BaseItem) {
        this.RemoveByKey(item.Key)
    }

    /**
     * Remove item by key
     * @param key
     * @constructor
     */
    RemoveByKey(key: number) {
        const item = this._items.get(key)
        if (!item) {
            throw new Error(`Item(key:${key}) not exist in Bag ${this.itemType}`);
        }
        this._items.delete(key);
        this.OnItemChanged(item, true);
    }

    /**
     * clear bag
     */
    Clear(): void {
        this._items.forEach((item) => {
            this.OnItemChanged(item, true);
        })
        this._items.clear();
        this._itemKeys = undefined;
        this._compareFunc = undefined;
    }

    /**
     * get item by key
     * @param key
     * @returns item
     */
    GetByKey(key: number): BaseItem {
        return this._items.get(key);
    }

    /**
     * set key list dirty when any item in the bag changes
     */
    OnItemChanged(item: BaseItem, isDeleted: boolean = false): void {
        this._itemKeys = undefined;
        OnBagItemChanged(item, isDeleted)
    }

    /**
     * get count of items
     * @returns
     */
    get Count(): number {
        return this._items.size;
    }

    /**
     * get item by index
     * @param index
     * @returns item
     */
    GetByIndex(index: number): BaseItem {
        let keys = this.ItemKeys;
        let key = keys[index];
        if (key) {
            return this.GetByKey(key);
        }
    }

    /**
     * set sort function
     * @param func sort function
     */
    SetComparer(func: BaseItemComparer) {
        if (this._compareFunc === func) {
            return;
        }
        this._compareFunc = func;
        this._itemKeys = undefined;
    }

    /**
     * get sorted key list
     * @returns
     */
    private get ItemKeys(): number[] {
        //no change since last call, return
        if (this._itemKeys) {
            return this._itemKeys;
        }

        //sort
        let itemList: BaseItem[] = []
        this._items.forEach(item => {
            itemList.push(item)
        })

        if (this._compareFunc) {
            itemList.sort(this._compareFunc)
        }

        //item to key
        let keyList = new Array<number>(itemList.length);
        itemList.forEach((item, index) => {
            keyList[index] = item.Key;
        });

        //default, sort by Key
        if (!this._compareFunc) {
            keyList.sort();
        }

        this._itemKeys = keyList;

        return keyList;
    }

    ProcessItems(func: (item: BaseItem) => void) {
        this._items.forEach(func);
    }

    toString(): string {
        let count = this.Count;
        let strList = new Array<string>(count + 2);
        strList[0] = `>-----------Bag ${this.itemType} Begin-------------<`
        strList[count + 1] = "<-----------Bag End------------->"
        for (let index = 0; index < count; index++) {
            let item = this.GetByIndex(index);
            strList[index + 1] = `${index}: ${item}`;
        }
        return strList.join("\r\n");
    }
}

