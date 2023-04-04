/**
 * manager of all game items, almost all data are items
 */

import BaseBag, {BagObserveFunc} from "../Item/Base/BaseBag";
import {EItemType} from "../Define/ItemDefine";
import {BaseItem, ItemObserverFunc} from "../Item/Base/BaseItem";
import {NextId} from "./IdMgr";
import {WaitContainer} from "./WaitContainer";
import it from "node:test";

let _AllItemBags: Map<EItemType, BaseBag>
//will keep the item instance only if it's deleted
let _ChangedBagItems: Map<EItemType, Map<number, BaseItem>>
let _ObserveMap: Map<number, [EItemType, number]>
let _WaitObservers: WaitContainer<number, [EItemType, number, Function]>
/**
 * is now dispatching? during this add and remove should be suspended,
 * to avoid bugs like adding/removing handlers in handler functions
 */
let _isPatching = false

export function Init() {
    _AllItemBags = new Map<number, BaseBag>()
    _ChangedBagItems = new Map<EItemType, Map<number, BaseItem>>()
    _ObserveMap = new Map<number, [EItemType, number]>()
    _WaitObservers = new WaitContainer<number, [EItemType, number, Function]>()
}

export function GetBag(itemType: EItemType): BaseBag {
    let bag = _AllItemBags.get(itemType);
    if (bag) {
        return bag
        // throw new Error(`[Bag] NewBag failed, Bag Already Exist: ${EItemType[itemType]}`);
    }
    bag = new BaseBag(itemType);
    _AllItemBags.set(itemType, bag);
    // Info(`[Bag] New Bag: ${EItemType[itemType]}`);
    return bag;
}

export function AddItemToBag(item: BaseItem) {
    const bag = GetBag(item.ItemType)
    if (!bag) {
        throw new Error(`[Bag] AddItemToBag failed, Bag Not Exist: ${EItemType[item.ItemType]}`);
    }
    bag.Add(item)
}

export function GetItemCount(itemType: EItemType): number {
    const bag = GetBag(itemType)
    if (!bag) {
        return 0
    }
    return bag.Count
}

export function GetItem<T extends BaseItem>(itemType: EItemType, key: number = 0): T {
    const bag = GetBag(itemType)
    return bag.GetByKey(key) as T
}

export function GetItemByIndex<T extends BaseItem>(itemType: EItemType, index: number = 0): T {
    const bag = GetBag(itemType)
    return bag.GetByIndex(index) as T
}

export function OnBagItemChanged(item: BaseItem, isDeleted: boolean) {
    let bagRecord = _ChangedBagItems.get(item.ItemType)
    if (!bagRecord) {
        bagRecord = new Map<number, any>()
        _ChangedBagItems.set(item.ItemType, bagRecord)
    }
    if (isDeleted) {
        bagRecord.set(item.Key, item)
    } else {
        bagRecord.set(item.Key, null)
    }
}

export function Update(deltaTime: number) {
    if (_ChangedBagItems.size == 0) {
        return
    }
    _isPatching = true
    _ChangedBagItems.forEach((items, itemType) => {
        const bag = GetBag(itemType)
        items.forEach((item, itemKey) => {
            //item already deleted, kept for last call
            if (item != null) {
                item.Observers.Dispatch(itemType, itemKey)
            } else {
                const item = bag.GetByKey(itemKey)
                if (item) {
                    item.Observers.Dispatch(itemType, itemKey)
                }
            }
        })
        bag.Observers.Dispatch(itemType)
    })
    _ChangedBagItems.clear()
    _isPatching = false

    //waiting remove
    _WaitObservers.ProcessRemove(InnerCancelObserve);
    //waiting add
    _WaitObservers.ProcessAdd((k, v) => InnerObserve(k, ...v))
}

function InnerObserve(id: number, itemType: EItemType, itemKey: number, handler: Function) {
    const bag = GetBag(itemType)
    if (itemKey == -1) {
        bag.Observers.Add(id, handler as BagObserveFunc)
    } else {
        const item = bag.GetByKey(itemKey)
        if (!item) {
            throw new Error(`[Bag] ObserveItem failed, Item Not Exist: ${EItemType[itemType]}:${itemKey}`);
        }
        item.Observers.Add(id, handler as ItemObserverFunc)
    }
    _ObserveMap.set(id, [itemType, itemKey])
}

export function ObserveBag(itemType: EItemType, handler: BagObserveFunc): number {
    let id = NextId();
    if (!_isPatching) {
        InnerObserve(id, itemType, -1, handler);
    } else {
        _WaitObservers.Add(id, [itemType, -1, handler]);
    }
    return id;
}

export function ObserveItem(itemType: EItemType, itemKey: number, handler: ItemObserverFunc): number {
    const item = GetItem(itemType, itemKey)
    if (!item) {
        return 0
    }
    let id = NextId();
    if (!_isPatching) {
        InnerObserve(id, itemType, itemKey, handler);
    } else {
        _WaitObservers.Add(id, [itemType, itemKey, handler]);
    }
    return id;
}

function InnerCancelObserve(observeId: number): number {
    const tup = _ObserveMap.get(observeId)
    if (!tup) {
        return 0
    }
    const [itemType, itemKey] = tup
    if (itemKey == -1) {
        const bag = GetBag(itemType)
        bag.Observers.Remove(observeId)
    } else {
        const bag = GetBag(itemType)
        const item = bag.GetByKey(itemKey)
        if (item) {
            item.Observers.Remove(observeId)
        }
    }
    _ObserveMap.delete(observeId)
}

export function CancelObserve(observeId: number) {
    //relieve caller from checking for observeId
    if (observeId == 0) {
        return 0
    }
    if (!_isPatching) {
        InnerCancelObserve(observeId);
    } else {
        _WaitObservers.Remove(observeId);
    }

    return 0
}