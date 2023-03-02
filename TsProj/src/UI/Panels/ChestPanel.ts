import {ChestPanelBinder} from "../PanelBinders/ChestPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI

export class ChestPanel extends BasePanel {

    static panelId: EPanelId = EPanelId.Chest

    private readonly _binder: ChestPanelBinder;

    constructor() {
        super(ChestPanel.panelId);
        this._binder = new ChestPanelBinder(this);
    }

    get binder(): ChestPanelBinder {
        return this._binder;
    }

    OnInit() {
        this.AddClickListener(this.binder.btn4)
		this.AddClickListener(this.binder.btn2)
		this.AddClickListener(this.binder.btn1)
		this.AddClickListener(this.binder.btn3)
        
        
    }

    OnShow() {
        
    }

    

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn4) {

        } else if (btn === this.binder.btn2) {

        } else if (btn === this.binder.btn1) {

        } else if (btn === this.binder.btn3) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
}