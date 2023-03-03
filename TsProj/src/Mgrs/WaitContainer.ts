/**
 * A waiting room for function related registrations
 *
 * Because function may add/remove callbacks which is forbidden during executing
 */
export class WaitContainer<K, T> {
    /**
     * wait for adding
     * @private
     */
    private readonly _to_add: Map<K, T>
    /**
     * wait for removing
     * @private
     */
    private readonly _to_remove: Set<K>

    constructor() {
        this._to_add = new Map<K, T>()
        this._to_remove = new Set<K>()
    }

    Add(key: K, val: T) {
        this._to_add.set(key, val)
    }

    Remove(key: K) {
        //cancel add
        if (this._to_add.delete(key)) {
            return;
        }
        //wait for removal
        this._to_remove.add(key)
    }

    ProcessRemove(func: (key: K) => void) {
        this._to_remove.forEach(func)
        this._to_remove.clear()
    }

    ProcessAdd(func: (key: K, val: T) => void) {
        this._to_add.forEach((val, key) => {
            func(key, val)
        });
        this._to_add.clear();
    }
}