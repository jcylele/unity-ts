/**
 * container for item binders
 */
export class ObserverContainer<T extends Function> {
    private _binders: Map<number, T> = new Map<number, T>()

    public Add(handlerId: number, binder: T) {
        this._binders.set(handlerId, binder)
    }

    public Remove(handlerId: number) {
        this._binders.delete(handlerId)
    }

    public Dispatch(...params: any[]) {
        this._binders.forEach(binder => {
            binder(params)
        })
    }
}