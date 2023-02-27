import BasePanel from "./../BasePanel";
import {EUIState} from "../../../Define/UIDefine";

/**
 * Different operations in different panel states
 * one instance for each subclass, shared by all panels
 */
export abstract class BasePanelStateHandler {
    protected constructor(readonly state: EUIState) {
    }

    /**
     * Triggered when panel switches to corresponding state
     * @param panel target panel
     * @constructor
     */
    abstract OnEnter(panel: BasePanel): EUIState

    abstract Init(panel: BasePanel, uiRoot: CS.TS.UI.UiBindRoot): EUIState;

    abstract Show(panel: BasePanel): EUIState

    abstract Hide(panel: BasePanel): EUIState

    abstract Close(panel: BasePanel): EUIState
}


