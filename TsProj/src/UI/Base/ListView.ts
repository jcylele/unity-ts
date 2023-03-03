import {BaseNodeBinder} from "./BaseNodeBinder";
import TS_UI = CS.TS.UI
import {ClassOf} from "../../Define/Const";

/**
 * display similar items in a container, a proxy of CS.TS.UI.ListView
 */
export class ListView<T extends BaseNodeBinder> {
    /**
     * a reusable instance of T
     * @private
     */
    private readonly _nodeBinder: T
    /**
     * corresponding C# Mono-behaviour
     * @private
     */
    private _uiListView: TS_UI.BaseListView
    /**
     * function to fill content of items, passed from panel
     * @private
     */
    private _funcFillItem: (item : T, index: number) =>void

    constructor(cls: ClassOf<T>) {
        this._nodeBinder = new cls()
    }

    Bind(uiListView: TS_UI.BaseListView) {
        this._uiListView = uiListView
        this._uiListView.JsFillItem = this.FillItem.bind(this)
    }

    /**
     * A wrapper for TS_UI.ListView.JsFillItem and SetFuncFillItem
     * @param node
     * @param index
     * @constructor
     */
    private FillItem(node: TS_UI.UiBindNode, index: number){
        if (this._funcFillItem){
            this._nodeBinder.Bind(node)
            this._funcFillItem(this._nodeBinder, index)
        }
    }

    /**
     * set fill function
     * @param func the function to fill each item
     * use bind(this) if you need to use this.xxx in the function
     * @constructor
     */
    SetFuncFillItem(func: (item : T, index: number) =>void){
        this._funcFillItem = func
    }

    /**
     * refresh display, should be called after SetFuncFillItem
     * @param count  number of items
     * @constructor
     */
    Refresh(count: number) {
        this._uiListView.SetCount(count)
    }
}