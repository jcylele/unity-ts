import {FirstPanelBinder,rightItemNodeBinder} from "../PanelBinders/FirstPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";

import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

import {DispatchEvent, RegEventHandler, UnregEventHandler} from "../../Mgrs/EventMgr";
import {EEventID} from "../../Define/EventDefine";
import {AddDelayTimer, AddTickTimer, RemoveTimer} from "../../Mgrs/TimerMgr";
import {Info} from "../../Common/Log";

export class FirstPanel extends BasePanel {
    static panelId: EPanelId = EPanelId.First

    private readonly _binder: FirstPanelBinder;

    constructor() {
        super(FirstPanel.panelId);
        this._binder = new FirstPanelBinder(this);
    }

    get binder(): FirstPanelBinder {
        return this._binder;
    }

    private _handlerId : number
    private _timerId : number

    OnInit() {
        this.AddClickListener(this.binder.btn1)
		this.AddClickListener(this.binder.leftBar.btnLeft)
		this.AddSlideListener(this.binder.slider1)
        
        this.binder.rightList.SetFuncFillItem(this.fill_rightItem.bind(this))
        this._handlerId = RegEventHandler(EEventID.None, this.onEventTest.bind(this))
    }

    OnShow() {
        this.binder.rightList.SetItemCount(0)
        this._timerId = AddTickTimer(1000, this.tick)
    }

    private tick(){
        Info(CS.UnityEngine.Time.time)
        this._timerId = RemoveTimer(this._timerId)
    }

    private onEventTest(eventData: number, eventId: EEventID){
        Info(eventData)
    }

    private fill_rightItem(item: rightItemNodeBinder, index: number){
        
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            DispatchEvent(EEventID.None, 87654)
        } else if (btn === this.binder.leftBar.btnLeft) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {

        }
    }

    OnHide() {
        this._timerId = RemoveTimer(this._timerId)
    }

    OnClose() {
        this._handlerId = UnregEventHandler(this._handlerId)
    }
}