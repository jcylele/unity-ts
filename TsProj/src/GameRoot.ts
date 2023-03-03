//controls the init and update of all ts scripts


import * as UIMgr from "./Mgrs/UIMgr";
import * as UIEventMgr from "./Mgrs/UIEventMgr";
import * as EventMgr from "./Mgrs/EventMgr";
import * as IdMgr from "./Mgrs/IdMgr";
import * as TimerMgr from "./Mgrs/TimerMgr";
import * as CsUtil from "./CsUtil";

export class GameRoot {
    /**
     * Initialization Of Game On The TS Side
     * Order is important!!!!
     */
    private onStart() {
        console.log("ts on start")
        CsUtil.Init()
        IdMgr.Init()
        TimerMgr.Init()
        EventMgr.Init()
        UIMgr.Init()
        UIEventMgr.Init()
    }

    private onUpdate(deltaTime: number) {
        // console.log("ts on update", deltaTime)

        //TimerMgr use ms
        TimerMgr.Update(deltaTime * 1000)
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
