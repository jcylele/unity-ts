import {EPanelId} from "./Define/UIDefine";
import {OpenPanel} from "./Mgrs/UIMgr";
import {FirstPanel} from "./UI/Panels/FirstPanel";

export async function Test() {
    await OpenPanel(FirstPanel, 0.8)
    console.log("test done!")
}
