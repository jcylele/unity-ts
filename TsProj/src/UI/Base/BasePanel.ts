import {EUIPanel, EUIState} from "../../Define/UIDefine";
import {GetPanelConfig, PanelConfig} from "../../Configs/PanelConfigUtil";
import BasePanelBinder from "./BasePanelBinder";
import {GetPanelStateHandler} from "./PanelStateUtil";
import CS_UI = CS.UnityEngine.UI;

//TODO state switch logic should be clear

export default abstract class BasePanel {
    /**
     * unique identity for the panel
     */
    readonly panelId: EUIPanel
    /**
     * current state of the panel
     */
    _state: EUIState
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

    protected constructor(panelId: EUIPanel) {
        this.panelId = panelId
        this._state = EUIState.None
        this._visible = true
        this._initialed = false
        this._destroy = false
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

    Show() {
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

    OnInit(): void {
        console.log(`[UI] ${EUIPanel[this.panelId]} OnInit`);
    }

    OnShow(): void {
        console.log(`[UI] ${EUIPanel[this.panelId]} OnShow`);
    }

    OnHide(): void {
        console.log(`[UI] ${EUIPanel[this.panelId]} OnHide`);
    }

    OnClose(): void {
        console.log(`[UI] ${EUIPanel[this.panelId]} OnClose`);
    }

    //#endregion

    //#region UI events

    OnClick(btn: CS_UI.Button, customData: any) {

    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any) {

    }

    //#endregion
}