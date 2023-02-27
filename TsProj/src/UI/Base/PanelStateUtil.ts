import {EUIState} from "../../Define/UIDefine";
import {BasePanelStateHandler} from "./PanelStateHandlers/BasePanelStateHandler";
import {LoadingStateHandler} from "./PanelStateHandlers/LoadingStateHandler";
import {ShowingStateHandler} from "./PanelStateHandlers/ShowingStateHandler";
import {HidingStateHandler} from "./PanelStateHandlers/HidingStateHandler";
import {ClosingStateHandler} from "./PanelStateHandlers/ClosingStateHandler";


const handlerMap: Map<EUIState, BasePanelStateHandler> = new Map([
    [EUIState.Loading, new LoadingStateHandler()],
    [EUIState.Showing, new ShowingStateHandler()],
    [EUIState.Hiding, new HidingStateHandler()],
    [EUIState.Closing, new ClosingStateHandler()],
])

export function GetPanelStateHandler(state: EUIState) : BasePanelStateHandler {
    return handlerMap.get(state)
}