//start point of all ts code, execute only once
//bind functions on ts side to C#

import {GameRoot} from "./GameRoot";
import {_OnButtonClick, _OnSliderChange, _OnTweenComplete} from "./Mgrs/UIEventMgr";
import {_OnPanelLoaded} from "./Mgrs/UIMgr";
import {Test} from "./test";
import {_OnReceiveMsg} from "./Mgrs/MsgMgr";
import {Info} from "./Common/Log";
import {GetText} from "./Common/Text";

Info("start binding")

let Singleton = CS.TS.Singleton.Instance
//life cycle
const gameRoot = new GameRoot()
gameRoot.bindJs(Singleton.JsManager)
//ui mgr
Singleton.UiManager.JsOnPanelLoaded = _OnPanelLoaded
//ui events
Singleton.UiEventManager.JsOnButtonClick = _OnButtonClick
Singleton.UiEventManager.JsOnSliderValueChange = _OnSliderChange
Singleton.UiEventManager.JsOnTweenComplete = _OnTweenComplete
//network message

//for test
Singleton.JsManager.JsGetText = GetText
Singleton.JsManager.JsTest = Test

Info("finish binding")