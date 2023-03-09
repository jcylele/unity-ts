import {GeneratePanel} from "./UI/Panels/GeneratePanel";
import {OpenPanel} from "./Mgrs/UIMgr";

export async function Test() {
    console.log("start test")
    // await OpenPanel(GeneratePanel, 0.8)
    await OpenPanel(GeneratePanel, 0.8)
    // console.log(EEventID[EEventID.BagChanged])
}



