import {EPanelId, EUIListener, EUIState} from "../../Define/UIDefine";
import {GetPanelConfig, PanelConfig} from "../../Configs/PanelConfig";
import {BasePanelBinder} from "./BasePanelBinder";
import {GetPanelStateHandler} from "./PanelStateUtil";
import CS_UI = CS.UnityEngine.UI;
import {AddListener} from "../../Mgrs/UIEventMgr";

//TODO state switch logic should be clear

export abstract class BasePanel {
    /**
     * unique identity for the panel
     */
    readonly panelId: EPanelId
    /**
     * arguments passed to the panel
     * @protected
     */
    protected _panel_arg: any
    /**
     * current state of the panel
     */
    private _state: EUIState
    /**
     * related to canvas show order
     * @private
     */
    private _sort_order: number
    /**
     * is panel showing or hiding
     */
    _visible: boolean
    /**
     * is OnInit called yet
     */
    _initialed: boolean
    /**
     * is marked for destroy
     */
    _destroy: boolean

    abstract get binder(): BasePanelBinder;

    get state(): EUIState {
        return this._state
    }

    get sort_order(): number{
        return this._sort_order
    }

    set sort_order(val: number){
        this._sort_order = val
        this.binder._SetSortOrder(val)
    }

    get panel_arg(): any{
        return this._panel_arg
    }

    /**
     * process incoming arg, should be overriden seldomly
     * @param arg
     * @protected
     */
    set panel_arg(arg: any){
        this._panel_arg = arg
    }

    protected constructor(panelId: EPanelId) {
        this.panelId = panelId
        this._state = EUIState.None
        this._visible = true
        this._initialed = false
        this._destroy = false
        this._panel_arg = undefined
    }

    get config(): PanelConfig {
        return GetPanelConfig(this.panelId);
    }

    //#region different state changes
    _Init(uiRoot: CS.TS.UI.UiBindRoot) {
        const stateHandler = GetPanelStateHandler(this._state)
        let new_state = stateHandler.Init(this, uiRoot)
        if (new_state !== this._state){
            this._OnEnterNewState(new_state)
        }
    }

    Show(arg?: any) {
        this.panel_arg = arg
        const stateHandler = GetPanelStateHandler(this._state)
        let new_state = stateHandler.Show(this)
        if (new_state !== this._state){
            this._OnEnterNewState(new_state)
        }
    }

    Hide() {
        const stateHandler = GetPanelStateHandler(this._state)
        let new_state = stateHandler.Hide(this)
        if (new_state !== this._state){
            this._OnEnterNewState(new_state)
        }
    }

    Close() {
        const stateHandler = GetPanelStateHandler(this._state)
        let new_state = stateHandler.Close(this)
        if (new_state !== this._state){
            this._OnEnterNewState(new_state)
        }
    }

    _OnEnterNewState(new_state: EUIState){
        if (new_state === this._state){
            throw new Error("panel enters same state")
        }
        this._state = new_state
        const stateHandler = GetPanelStateHandler(this._state)
        new_state = stateHandler.OnEnter(this)
        if (new_state === this._state){
            return
        }
        this._OnEnterNewState(new_state)
    }

    //#endregion

    //#region life cycle callbacks

    /**
     * override this method to add listeners for components and execute other one-time initialization
     * @constructor
     */
    OnInit(): void {
        console.log(`[UI] ${EPanelId[this.panelId]} OnInit`);
    }

    /**
     * override this method to change the display of components and timers
     * @constructor
     */
    OnShow(): void {
        console.log(`[UI] ${EPanelId[this.panelId]} OnShow`);
    }

    /**
     * override this method to stop timers and other cleanup
     * @constructor
     */
    OnHide(): void {
        console.log(`[UI] ${EPanelId[this.panelId]} OnHide`);
    }

    /**
     * execute after Close is called,
     * no need to remove component listeners, they will be removed automatically
     * @constructor
     */
    OnClose(): void {
        console.log(`[UI] ${EPanelId[this.panelId]} OnClose`);
    }

    //#endregion

    //#region UI events

    OnClick(btn: CS_UI.Button, customData: any) {

    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any) {

    }

    AddClickListener(button: CS_UI.Button, customData?: any) {
        this.binder.AddCompListener(EUIListener.Click, button, customData)
    }

    AddSlideListener(slider: CS_UI.Slider, customData?: any) {
        this.binder.AddCompListener(EUIListener.Slide, slider, customData)
    }

    //#endregion
}