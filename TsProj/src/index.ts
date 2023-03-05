//start point of all ts code, execute only once
//bind functions on ts side to C#

import {GameRoot} from "./GameRoot";
import {OnButtonClick, OnSliderChange} from "./Mgrs/UIEventMgr";
import {_OnPanelLoaded} from "./Mgrs/UIMgr";
import {Test} from "./test";

console.log("start binding")

let Singleton = CS.TS.Singleton.Instance
//life cycle
const gameRoot = new GameRoot()
gameRoot.bindJs(Singleton.JsManager)
//ui mgr
Singleton.UiManager.add_JsOnPanelLoaded(_OnPanelLoaded)
//ui events
Singleton.UiEventManager.add_JsOnButtonClick(OnButtonClick)
Singleton.UiEventManager.add_JsOnSliderValueChange(OnSliderChange)
//network message

//for test
Singleton.JsManager.JsTest = Test

console.log("finish binding")