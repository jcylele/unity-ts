import {OpenPanel} from "./Mgrs/UIMgr";

import {GeneratePanel} from "./UI/Panels/GeneratePanel";
import {ChestPanel} from "./UI/Panels/ChestPanel";

export async function Test() {
    console.log("start test")
    // await OpenPanel(GeneratePanel, 0.8)
    await OpenPanel(ChestPanel, 0.8)
}
