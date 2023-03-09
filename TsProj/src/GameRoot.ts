//controls the init and update of all ts scripts


import * as UIMgr from "./Mgrs/UIMgr";
import * as UIEventMgr from "./Mgrs/UIEventMgr";
import * as EventMgr from "./Mgrs/EventMgr";
import * as IdMgr from "./Mgrs/IdMgr";
import * as TimerMgr from "./Mgrs/TimerMgr";
import * as CtrlMgr from "./Mgrs/CtrlMgr";
import * as MsgMgr from "./Mgrs/MsgMgr";
import * as ItemMgr from "./Mgrs/ItemMgr";
import * as MockNetwork from "./Mgrs/MockNetwork";
import * as CsUtil from "./CsUtil";
import {Info} from "./Common/Log";

export class GameRoot {
    /**
     * Initialization Of Game On The TS Side
     *
     * ORDER IS IMPORTANT !!!!
     */
    private onStart() {
        Info("ts on start")
        IdMgr.Init()
        CsUtil.Init()
        TimerMgr.Init()
        EventMgr.Init()
        UIMgr.Init()
        UIEventMgr.Init()
        MsgMgr.Init()
        MockNetwork.Init()
        CtrlMgr.Init()
        ItemMgr.Init()
    }

    private onUpdate(deltaTime: number) {
        const dtMs = deltaTime * 1000

        TimerMgr.Update(dtMs)
        MockNetwork.Update(dtMs)
        ItemMgr.Update(dtMs)
    }

    private onDestroy() {
        Info("ts on destroy")
    }

    bindJs(jsManager: CS.TS.JsManager) {
        jsManager.JsStart = this.onStart
        jsManager.JsUpdate = this.onUpdate
        jsManager.JsOnDestroy = this.onDestroy
    }
}
