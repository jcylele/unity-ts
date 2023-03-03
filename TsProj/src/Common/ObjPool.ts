import {ClassOf} from "../Define/Const";

/**
 * interface for reusable objects
 */
export interface IPoolable {
    /**
     * reset fields when put back in pool,
     * mainly used to dispose resource and reference
     */
    reset(): void
}

/**
 * A simple pool for reusable objects
 */
export class ObjPool<T extends IPoolable>{
    private readonly _obj_list: T[]
    private readonly _cls: ClassOf<T>

    constructor(cls: ClassOf<T>) {
        this._cls = cls
        this._obj_list = []
    }

    Get(): T{
        if (this._obj_list.length > 0){
            return this._obj_list.pop()
        }
        return new this._cls()
    }

    Set(obj: T){
        obj.reset()
        this._obj_list.push(obj)
    }
}