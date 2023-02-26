import {EUIPanel} from "./Define/UIDefine";
import {OpenPanel} from "./Mgrs/UIMgr";
import FirstPanel from "./UI/Panels/FirstPanel";

export async function Test() {
    await OpenPanel(EUIPanel.First, FirstPanel)
    console.log("test done!")
}
