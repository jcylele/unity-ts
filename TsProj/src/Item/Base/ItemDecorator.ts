import {IAttrProvider} from "./AttrCache";
import BaseItem from "./BaseItem";
import {GetBag} from "../../Mgrs/ItemMgr";
import {Info} from "../../Common/Log";

function IsAttrProvider(provider: any): provider is IAttrProvider {
    return (<IAttrProvider>provider).attr !== undefined;
}

/**
 * decorated method will cause AttrCache.Invalidate
 */
export function attrInvalidated(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;

    descriptor.value = function (...args: any) {

        //only method of IAttrProvider can be decorated
        if (!(IsAttrProvider(this))) {
            throw new Error("attrInvalid decorator only used for classes implements IAttrProvider");
        }

        const result = original.call(this, ...args);

        Info(`Item ${this} attrInvalidated By ${propertyKey}`);

        this.attr.Invalidate();

        return result;
    }
}

/**
 * decorated method changes the item and needs to notify the belonged bag
 */
export function itemChanged(target: any, propertyKey: string, descriptor: PropertyDescriptor) {

    const original = descriptor.value;

    descriptor.value = function (...args: any) {

        //only method of item can be decorated
        if (!(target instanceof BaseItem)) {
            throw new Error("itemChanged decorator only used on classes extends BaseItem");
        }

        const result = original.call(this, ...args);

        console.log(`Item ${this} Changed By ${propertyKey}`);

        //notify bag
        GetBag(this.itemType).OnItemChanged();

        return result;
    }
}