import {BaseNodeBinder} from "./BaseNodeBinder";
import TS_UI = CS.TS.UI

/**
 * display similar items in a container, a proxy of CS.TS.UI.ListView
 */
export class ListView<T extends BaseNodeBinder> {
    private readonly _cls: { new(): T; }
    private _uiListView: TS_UI.ListView
    private readonly _children: T[] = []

    constructor(cls: { new(): T; }) {
        this._cls = cls
    }

    Bind(uiListView: TS_UI.ListView) {
        this._uiListView = uiListView
    }

    private SetCount(count: number) {
        //handles visibility
        this._uiListView.Count = count
        //
        for (let i = this._children.length; i < count; i++) {
            const child: T = new this._cls()
            child.Bind(this._uiListView.get_Item(i))
            this._children.push(child)
        }
    }

    /**
     * Update display
     * @param count number of items
     * @param funcFillItem the function to fill each item
     * use bind(this) if you need to use this.xxx in the function
     * @constructor
     */
    Refresh(count: number, funcFillItem: (item: T, index: number) => void) {
        this.SetCount(count)
        for (let i = 0; i < count; i++) {
            funcFillItem(this._children[i], i);
        }
    }
}