import {ChestPanelBinder} from "../PanelBinders/ChestPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI

export class ChestPanel extends BasePanel {

    private readonly _binder: ChestPanelBinder;

    constructor() {
        super(EPanelId.Chest);
        this._binder = new ChestPanelBinder(this);
    }

    public get binder(): ChestPanelBinder {
        return this._binder;
    }

    private SetTexture(id: number){
        this.binder.imgChest.SetTexture(`UI/Textures/chest${id}`)
    }

    OnInit() {
        this.AddClickListener(this.binder.btn4)
		this.AddClickListener(this.binder.btn2)
		this.AddClickListener(this.binder.btn1)
		this.AddClickListener(this.binder.btn3)
    }

    OnShow() {
        
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn4) {
            this.SetTexture(4)
        } else if (btn === this.binder.btn2) {
            this.SetTexture(2)
        } else if (btn === this.binder.btn1) {
            this.SetTexture(1)
        } else if (btn === this.binder.btn3) {
            this.SetTexture(3)
        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
}