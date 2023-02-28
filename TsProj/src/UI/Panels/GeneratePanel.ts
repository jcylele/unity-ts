import {GeneratePanelBinder} from "../PanelBinders/GeneratePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI

export class GeneratePanel extends BasePanel {

    private readonly _binder: GeneratePanelBinder;

    constructor() {
        super(EPanelId.Generate);
        this._binder = new GeneratePanelBinder(this);
    }

    public get binder(): GeneratePanelBinder {
        return this._binder;
    }

    OnInit() {
        this.AddClickListener(this.binder.btnSubmit)
    }

    OnShow() {
        
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btnSubmit) {

        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
}