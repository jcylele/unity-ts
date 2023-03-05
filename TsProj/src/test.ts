import {EPanelId} from "./Define/UIDefine";
import {OpenPanel} from "./Mgrs/UIMgr";
import {FirstPanel} from "./UI/Panels/FirstPanel";
import Time = CS.UnityEngine.Time
import {AddTickTimer} from "./Mgrs/TimerMgr";
import {ChestPanel} from "./UI/Panels/ChestPanel";

import {GeneratePanel} from "./UI/Panels/GeneratePanel";

export async function Test() {
    console.log("start test")
    await OpenPanel(GeneratePanel, 0.8)
}
