import {EPanelId} from "./Define/UIDefine";
import {OpenPanel} from "./Mgrs/UIMgr";
import FirstPanel from "./UI/Panels/FirstPanel";

export async function Test() {
    await OpenPanel(EPanelId.First, FirstPanel)
    console.log("test done!")
}
