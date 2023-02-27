import {EUIState} from "../../../Define/UIDefine";
import BasePanel from "./../BasePanel";
import {BasePanelStateHandler} from "./BasePanelStateHandler";
import {_OnPanelClosed} from "../../../Mgrs/UIMgr";

export class ClosingStateHandler extends BasePanelStateHandler {
    constructor() {
        super(EUIState.Closing);
    }

    OnEnter(panel: BasePanel): EUIState {
        if (!panel._destroy) {
            panel._destroy = true
        }
        if (panel._visible) {
            panel._visible = false
        }
        if (panel._initialed) {
            panel._initialed = false
            panel.binder._Close()
            panel.OnClose()
            _OnPanelClosed(panel)
        }
        return this.state
    }

    Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState {
        uiRoot.Destroy()
        return this.state
    }

    Show(panel: BasePanel): EUIState {
        return this.state
    }

    Hide(panel: BasePanel): EUIState {
        return this.state
    }

    Close(panel: BasePanel): EUIState {
        return this.state
    }
}
