/**
 * class who uses an AttrCache should implement this interface
 */
import {BaseItem} from "./BaseItem";

/**
 * base class of cached value
 */
export abstract class BaseCachedValue {
    abstract Invalidate(): void;
}

/**
 * cache of attributes
 */
export class CachedValue<T> extends BaseCachedValue {
    /**
     * attributes list, will be undefined when invalidated, will calculate before used
     */
    private val: T | undefined

    /**
     * constructor
     * @param owner     owner of field
     * @param id        id of field, do not repeat in one class or derived classes
     * @param CalcAttr  function to calculate attributes, no need to bind(this)
     */
    constructor(private readonly owner: BaseItem, private readonly CalcAttr: () => T) {
        super()
        this.owner._AddCachedValue(this)
    }

    /**
     * invalidate cache
     * @constructor
     */
    override Invalidate(): void {
        this.val = undefined
    }

    /**
     * get value of cache, will calculate when necessary
     *
     * @constructor
     */
    get Value(): T {
        if (this.val !== undefined) {
            return this.val
        }
        this.val = this.CalcAttr.bind(this.owner)()
        return this.val
    }
}

