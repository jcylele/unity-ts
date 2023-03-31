import {BaseAttr} from "./BaseItem";
import {GetBag} from "../../Mgrs/ItemMgr";
import {Info} from "../../Common/Log";


function OnAttrChanged(target:any, propertyKey: string) {
    //only method of item can be decorated
    if (!(target instanceof BaseAttr)) {
        throw new Error("itemChanged decorator only used on classes extends BaseAttr");
    }

    Info(`Item ${this._owner} Changed By ${propertyKey}`);

    //invalidate attr cache
    this.OnAttrChanged();

    //notify bag
    GetBag(this._owner.ItemType).OnItemChanged(this._owner.Key);
}

/**
 * decorated on set methods which changes the base attr of an item,
 * invalidate all attr cache and notify bag
 */
export function AttrSetter<T>(target: any,
                              propertyKey: string,
                              descriptor: TypedPropertyDescriptor<T>) {

    const set = descriptor.set;

    descriptor.set = function (val: T) {
        const result = set.call(this, val);
        OnAttrChanged(target, propertyKey);
        return result;
    }
}

/**
 * decorated on methods which changes the base attr of an item
 * invalidate all attr cache and notify bag
 */
export function AttrChanged(target: Object,
                            propertyKey: string,
                            descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
        const result = originalMethod.apply(this, args);
        OnAttrChanged(target, propertyKey);
        return result;
    };
}