import {childNodeBinder, FirstPanelBinder, rightItemNodeBinder} from "../PanelBinders/FirstPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {DispatchEvent, RegEventHandler, UnregEventHandler} from "../../Mgrs/EventMgr";
import {EEventID} from "../../Define/EventDefine";
import CS_UI = CS.UnityEngine.UI;

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

    OnInit() {
        this.AddSlideListener(this.binder.slider1)
		this.AddClickListener(this.binder.btn1)
		this.AddClickListener(this.binder.leftBar.btnLeft)
        
        this.binder.leftBar.itemList.SetFuncFillItem(this.fill_child.bind(this))
		this.binder.rightList.SetFuncFillItem(this.fill_rightItem.bind(this))

        this._handlerId = RegEventHandler(EEventID.Test, this.onEventTest.bind(this))
    }

    OnShow() {
        this.binder.leftBar.itemList.Refresh(0)
		this.binder.rightList.Refresh(0)
    }

    private onEventTest(eventData: number, eventId: EEventID){
        console.log(eventData)
    }

    private fill_child(item: childNodeBinder, index: number){
        
    }
	private fill_rightItem(item: rightItemNodeBinder, index: number){
        
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            DispatchEvent(EEventID.Test, 87654)
        } else if (btn === this.binder.leftBar.btnLeft) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {

        }
    }

    OnClose() {
        this._handlerId = UnregEventHandler(this._handlerId)
    }
}