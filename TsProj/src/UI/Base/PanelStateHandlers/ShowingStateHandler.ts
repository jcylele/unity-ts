import {EUIState} from "../../../Define/UIDefine";
import BasePanel from "./../BasePanel";
import {BasePanelStateHandler} from "./BasePanelStateHandler";
import {_BringPanelToTop} from "../../../Mgrs/UIMgr";

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
            //order may be important
            _BringPanelToTop(panel)
            panel.binder._Show()
            panel.OnShow()
        }
        return this.state
    }

    Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState {
        throw new Error(`Init is called in ${this.state}`)
    }

    Show(panel: BasePanel): EUIState {
        //maybe panel is under others
        _BringPanelToTop(panel)
        return this.state;
    }

    Hide(panel: BasePanel): EUIState {
        return EUIState.Hiding;
    }

    Close(panel: BasePanel): EUIState {
        panel._destroy = true
        //hide before destroy
        return EUIState.Hiding;
    }
}