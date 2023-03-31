/**
 * 全物品管理器
 */

import BaseBag from "../Item/Base/BaseBag";
import {EItemType} from "../Define/ItemDefine";
import {BaseItem} from "../Item/Base/BaseItem";
import {Info} from "../Common/Log";
import {DispatchEvent} from "./EventMgr";
import {EEventID} from "../Define/EventDefine";

let _AllItemBags: Map<EItemType, BaseBag>
let _ChangedBags: Set<EItemType>

export function Init() {
    _AllItemBags = new Map<number, BaseBag>()
    _ChangedBags = new Set<EItemType>()
}

export function GetBag(itemType: EItemType, bCreate: boolean = false): BaseBag {
    let bag = _AllItemBags.get(itemType);
    if (!bag && bCreate) {
        bag = NewBag(itemType)
    }
    return bag;
}

export function NewBag(itemType: EItemType): BaseBag {
    let bag = _AllItemBags.get(itemType);
    if (bag) {
        throw new Error(`[Bag] NewBag failed, Bag Already Exist: ${EItemType[itemType]}`);
    }
    bag = new BaseBag(itemType);
    _AllItemBags.set(itemType, bag);
    Info(`[Bag] New Bag: ${EItemType[itemType]}`);
    return bag;
}

export function AddItemToBag(item: BaseItem) {
    const bag = GetBag(item.ItemType)
    if (!bag) {
        throw new Error(`[Bag] AddItemToBag failed, Bag Not Exist: ${EItemType[item.ItemType]}`);
    }
    bag.Add(item)
    OnBagChanged(item.ItemType)
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

export function OnBagChanged(itemType: EItemType) {
    _ChangedBags.add(itemType)
}

export function Update(deltaTime: number) {
    if (_ChangedBags.size > 0) {
        for (const itemType of _ChangedBags) {
            DispatchEvent(EEventID.BagChanged, itemType)
        }
        _ChangedBags.clear()
    }
}