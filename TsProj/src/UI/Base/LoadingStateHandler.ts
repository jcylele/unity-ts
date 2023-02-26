import {EUIState} from "../../Define/UIDefine";
import BasePanel from "./BasePanel";
import {LoadPanel} from "../../CsUtil";
import {BasePanelStateHandler} from "./BasePanelStateHandler";

export class LoadingStateHandler extends BasePanelStateHandler {
    constructor() {
        super(EUIState.Loading);
    }

    OnEnter(panel: BasePanel): EUIState {
        LoadPanel(panel.config.prefab, panel.panelId)
        return this.state
    }

    Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState {
        panel.binder.OnObjectLoaded(uiRoot)
        if (panel._visible) {
            return EUIState.Showing
        } else {
            return EUIState.Hiding
        }
    }

    Show(panel: BasePanel): EUIState {
        panel._visible = true
        return this.state
    }

    Hide(panel: BasePanel): EUIState {
        panel._visible = false
        return this.state
    }

    Close(panel: BasePanel): EUIState {
        return EUIState.Closing
    }
}
