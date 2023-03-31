import {Info} from "./Common/Log";
import {OpenPanel} from "./Mgrs/UIMgr";
import {MainPanel} from "./UI/Panels/MainPanel";


export async function Test() {
    Info("start test")
    await OpenPanel(MainPanel)
}



