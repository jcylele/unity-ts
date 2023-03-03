//controls the init and update of all ts scripts


import * as UIMgr from "./Mgrs/UIMgr";
import * as UIEventMgr from "./Mgrs/UIEventMgr";
import * as EventMgr from "./Mgrs/EventMgr";
import * as CsUtil from "./CsUtil";

export class GameRoot {
    private onStart() {
        console.log("ts on start")
        //order is important
        CsUtil.Init()
        EventMgr.Init()
        UIMgr.Init()
        UIEventMgr.Init()
    }

    private onUpdate(deltaTime: number) {
        // console.log("ts on update", deltaTime)

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
