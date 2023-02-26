import {EUIState} from "../../Define/UIDefine";
import BasePanel from "./BasePanel";
import {BasePanelStateHandler} from "./BasePanelStateHandler";

export class ShowingStateHandler extends BasePanelStateHandler {
    constructor() {
        super(EUIState.Showing);
    }

    OnEnter(panel: BasePanel): EUIState {
        const trigger_show = !panel._visible || !panel._initialed
        if (!panel._initialed) {
            panel._initialed = true
            panel.OnInit()
        }
        if (trigger_show) {
            panel._visible = true
            panel.binder.Show()
            panel.OnShow()
        }
        return this.state
    }

    Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState {
        throw new Error(`Init is called in ${this.state}`)
    }

    Show(panel: BasePanel): EUIState {
        return this.state;
    }

    Hide(panel: BasePanel): EUIState {
        return EUIState.Hiding;
    }

    Close(panel: BasePanel): EUIState {
        panel._destroy = true
        return EUIState.Hiding;
    }
}