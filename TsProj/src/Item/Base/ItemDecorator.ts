import {BaseAttr} from "./BaseItem";


function OnAttrChanged(obj: any, propertyKey: string) {
    //only method of item can be decorated
    if (!(obj instanceof BaseAttr)) {
        throw new Error("itemChanged decorator only used on classes extends BaseAttr");
    }

    obj.Owner._OnAttrChanged()
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
        OnAttrChanged(this, propertyKey);
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
        OnAttrChanged(this, propertyKey);
        return result;
    };
}