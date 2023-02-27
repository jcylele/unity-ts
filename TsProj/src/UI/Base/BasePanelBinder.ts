import {EUIListener} from "../../Define/UIDefine";
import BasePanel from "./BasePanel";

import CS_UI = CS.UnityEngine.UI
import Component = CS.UnityEngine.Component
import UiBindRoot = CS.TS.UI.UiBindRoot
import {AddListener, RemoveListener} from "../../Mgrs/UIEventMgr";

/**
 * in charge of Unity Related Operations
 */
export default abstract class BasePanelBinder {
    /**
     * attached to the root of the panel, along with the canvas
     */
    private uiRoot: UiBindRoot;

    /**
     * record all components with ui events
     */
    private readonly listenerMap: Map<Component, EUIListener>;

    constructor(private readonly panel: BasePanel) {
        this.listenerMap = new Map<Component, EUIListener>();
    }

    _OnObjectLoaded(uiRoot: UiBindRoot) {
        this.uiRoot = uiRoot;
        this.BindComponents();
    }

    protected GetBindComponent(name: string): Component {
        return this.uiRoot.get_Item(name);
    }

    protected abstract BindComponents(): void;

    protected AddClickListener(button: CS_UI.Button, customData?: any) {
        AddListener(EUIListener.Click, button, this.panel.panelId, customData);
        this.listenerMap.set(button, EUIListener.Click);
    }

    protected AddSlideListener(slider: CS_UI.Slider, customData?: any) {
        AddListener(EUIListener.Slide, slider, this.panel.panelId, customData);
        this.listenerMap.set(slider, EUIListener.Slide);
    }

    _Show(){
        if (this.uiRoot){
            this.uiRoot.Show(true)
        }
    }

    _Hide(){
        if (this.uiRoot){
            this.uiRoot.Show(false)
        }
    }

    _SetSortOrder(val: number){
        if (this.uiRoot){
            this.uiRoot.SetSortOrder(val)
        }
    }

    /**
     * cleanup before panel is closed
     */
    _Close(){
        this.listenerMap.forEach((listenerType, component) => {
            RemoveListener(listenerType, component, this.panel.panelId);
        });
        this.listenerMap.clear();
        if (this.uiRoot){
            this.uiRoot.Destroy()
        }
    }
}