import {EUIState} from "../../Define/UIDefine";
import {BasePanelStateHandler} from "./BasePanelStateHandler";
import {LoadingStateHandler} from "./LoadingStateHandler";
import {ShowingStateHandler} from "./ShowingStateHandler";
import {HidingStateHandler} from "./HidingStateHandler";
import {ClosingStateHandler} from "./ClosingStateHandler";


const handlerMap: Map<EUIState, BasePanelStateHandler> = new Map([
    [EUIState.Loading, new LoadingStateHandler()],
    [EUIState.Showing, new ShowingStateHandler()],
    [EUIState.Hiding, new HidingStateHandler()],
    [EUIState.Closing, new ClosingStateHandler()],
])

export function GetPanelStateHandler(state: EUIState) : BasePanelStateHandler {
    return handlerMap.get(state)
}