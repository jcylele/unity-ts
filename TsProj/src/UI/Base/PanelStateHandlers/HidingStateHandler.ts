import {EUIState} from "../../../Define/UIDefine";
import {BasePanel} from "./../BasePanel";
import {BasePanelStateHandler} from "./BasePanelStateHandler";
import TweenTiming = CS.UITween.TweenTiming

export class HidingStateHandler extends BasePanelStateHandler {
    constructor() {
        super(EUIState.Hiding);
    }

    OnEnter(panel: BasePanel): EUIState {
        if (panel._visible) {
            panel._visible = false
            //care for order
            panel.binder._Hide()
            panel.OnHide()
            panel.binder._PlayTweenByTiming(TweenTiming.Close)
        }
        if (panel._destroy) {
            return EUIState.Closing
        }
        return this.state
    }

    Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState {
        throw new Error(`Init is called in ${this.state}`)
    }

    Show(panel: BasePanel): EUIState {
        return EUIState.Showing
    }

    Hide(panel: BasePanel): EUIState {
        return this.state
    }

    Close(panel: BasePanel): EUIState {
        return EUIState.Closing
    }
}
