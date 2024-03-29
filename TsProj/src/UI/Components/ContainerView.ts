import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components
import {ClassOf} from "../../Common/Const";

type FillItemFunc<T> = (item: T, index: number, customData?: any) => void

/**
 * display similar items in a container, a proxy of CS.TS.UI.ListView
 */
export class ContainerView<T extends BaseNodeBinder> {

    /**
     * a reusable instance of T
     * @private
     */
    private readonly _nodeBinder: T
    /**
     * corresponding C# Mono-behaviour
     * @private
     */
    protected _uiListView: TS_Comp.BaseContainerView
    /**
     * function to fill content of items, passed from panel
     * @private
     */
    private _funcFillItem: FillItemFunc<T>
    /**
     * custom data of the ContainerView, used in nested ContainerViews/ScrollViews
     * @private
     */
    private _customData: any

    constructor(cls: ClassOf<T>) {
        this._nodeBinder = new cls()
    }

    Bind(uiListView: TS_Comp.BaseContainerView) {
        this._uiListView = uiListView
        this._uiListView.JsFillItem = this.FillItem.bind(this)
    }

    /**
     * A wrapper for TS_Comp.ListView.JsFillItem and SetFuncFillItem
     * @param node
     * @param index
     * @constructor
     */
    private FillItem(node: TS_UI.UiBindNode, index: number) {
        if (this._funcFillItem) {
            this._nodeBinder.Bind(node)
            this._funcFillItem(this._nodeBinder, index, this._customData)
        }
    }

    /**
     * set fill function
     * @param func the function to fill each item
     * use bind(this) if you need to use this.xxx in the function
     * @param customData custom data of the ContainerView
     * @constructor
     */
    SetFuncFillItem(func: FillItemFunc<T>, customData?: any) {
        this._funcFillItem = func
        this._customData = customData
    }

    /**
     * refresh display, should be called after SetFuncFillItem
     * @param count  number of items
     * @constructor
     */
    SetItemCount(count: number) {
        this._uiListView.SetItemCount(count)
    }
}