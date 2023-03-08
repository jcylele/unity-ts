//start point of all ts code, execute only once
//bind functions on ts side to C#

import {GameRoot} from "./GameRoot";
import {_OnButtonClick, _OnSliderChange} from "./Mgrs/UIEventMgr";
import {_OnPanelLoaded} from "./Mgrs/UIMgr";
import {Test} from "./test";
import {_OnReceiveMsg} from "./Mgrs/MsgMgr";

console.log("start binding")

let Singleton = CS.TS.Singleton.Instance
//life cycle
const gameRoot = new GameRoot()
gameRoot.bindJs(Singleton.JsManager)
//ui mgr
Singleton.UiManager.JsOnPanelLoaded = _OnPanelLoaded
//ui events
Singleton.UiEventManager.JsOnButtonClick = _OnButtonClick
Singleton.UiEventManager.JsOnSliderValueChange = _OnSliderChange
//network message

//for test
Singleton.JsManager.JsTest = Test

console.log("finish binding")