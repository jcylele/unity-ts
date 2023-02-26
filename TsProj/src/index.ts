//start point of all ts code, execute only once
//bind functions on ts side to C#

import {GameRoot} from "./GameRoot";
import {OnButtonClick, OnSliderChange} from "./Mgrs/UIEventMgr";
import {_OnPanelLoaded} from "./Mgrs/UIMgr";
import {Test} from "./test";

console.log("start binding")

//life cycle
const jsManager = CS.TS.JsManager.Instance
const gameRoot = new GameRoot()
gameRoot.bindJs(jsManager)
//ui mgr
CS.TS.UI.UiManager.Instance.add_JsOnPanelLoaded(_OnPanelLoaded)
//ui events
const csEventMgr = CS.TS.UI.UiEventManager.Instance
csEventMgr.add_JsOnButtonClick(OnButtonClick)
csEventMgr.add_JsOnSliderValueChange(OnSliderChange)
//for test
jsManager.JsTest = Test

console.log("finish binding")