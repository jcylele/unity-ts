import {GeneratePanel} from "./UI/Panels/GeneratePanel";
import {OpenPanel} from "./Mgrs/UIMgr";
import {Info} from "./Common/Log";

export async function Test() {
    Info("start test")
    // await OpenPanel(GeneratePanel, 0.8)
    await OpenPanel(GeneratePanel, 0.8)
    // console.log(EEventID[EEventID.BagChanged])
}



