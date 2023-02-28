import {EUIListener} from "../../Define/UIDefine";
import {BasePanel} from "./BasePanel";

import CS_UI = CS.UnityEngine.UI
import Component = CS.UnityEngine.Component
import UiBindRoot = CS.TS.UI.UiBindRoot
import {AddListener, RemoveListener} from "../../Mgrs/UIEventMgr";
import {BaseNodeBinder} from "./BaseNodeBinder";

/**
 * in charge of Unity Related Operations
 */
export abstract class BasePanelBinder extends BaseNodeBinder {
    /**
     * attached to the root of the panel, along with the canvas
     */
    protected uiRoot: UiBindRoot = undefined

    /**
     * record all components with ui events
     */
    private readonly listenerMap: Map<Component, EUIListener>;

    constructor(private readonly panel: BasePanel) {
        super();
        this.listenerMap = new Map<Component, EUIListener>();
    }

    AddCompListener(listenerType: EUIListener, component: Component, customData?: any){
        AddListener(listenerType, component, this.panel.panelId, customData);
        this.listenerMap.set(component, listenerType);
    }

    _Show() {
        if (this.uiRoot) {
            this.uiRoot.Show(true)
        }
    }

    _Hide() {
        if (this.uiRoot) {
            this.uiRoot.Show(false)
        }
    }

    _SetSortOrder(val: number) {
        if (this.uiRoot) {
            this.uiRoot.SetSortOrder(val)
        }
    }

    /**
     * cleanup before panel is closed
     */
    _Close() {
        this.listenerMap.forEach((listenerType, component) => {
            RemoveListener(listenerType, component, this.panel.panelId);
        });
        this.listenerMap.clear();
        if (this.uiRoot) {
            this.uiRoot.Destroy()
        }
    }
}