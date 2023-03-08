//controls the init and update of all ts scripts


import * as UIMgr from "./Mgrs/UIMgr";
import * as UIEventMgr from "./Mgrs/UIEventMgr";
import * as EventMgr from "./Mgrs/EventMgr";
import * as IdMgr from "./Mgrs/IdMgr";
import * as TimerMgr from "./Mgrs/TimerMgr";
import * as CtrlMgr from "./Mgrs/CtrlMgr";
import * as MsgMgr from "./Mgrs/MsgMgr";
import * as MockNetwork from "./Mgrs/MockNetwork";
import * as CsUtil from "./CsUtil";

export class GameRoot {
    /**
     * Initialization Of Game On The TS Side
     *
     * ORDER IS IMPORTANT !!!!
     */
    private onStart() {
        console.log("ts on start")
        IdMgr.Init()
        CsUtil.Init()
        TimerMgr.Init()
        EventMgr.Init()
        UIMgr.Init()
        UIEventMgr.Init()
        MsgMgr.Init()
        MockNetwork.Init()
        CtrlMgr.Init()
    }

    private onUpdate(deltaTime: number) {
        // console.log("ts on update", deltaTime)

        //TimerMgr use ms
        TimerMgr.Update(deltaTime * 1000)
        MockNetwork.Update(deltaTime * 1000)
    }

    private onDestroy() {
        console.log("ts on destroy")
    }

    bindJs(jsManager: CS.TS.JsManager) {
        jsManager.JsStart = this.onStart
        jsManager.JsUpdate = this.onUpdate
        jsManager.JsOnDestroy = this.onDestroy
    }
}
