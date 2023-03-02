import {GeneratePanelBinder, headNodeBinder} from "../PanelBinders/GeneratePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI

export class GeneratePanel extends BasePanel {

    private readonly _binder: GeneratePanelBinder;

    constructor() {
        //TODO don't forget to change the value
        super(EPanelId.None);
        this._binder = new GeneratePanelBinder(this);
    }

    get binder(): GeneratePanelBinder {
        return this._binder;
    }

    OnInit() {
        this.AddClickListener(this.binder.btnSubmit)
        
        this.binder.listHead.SetFuncFillItem(this.fill_head.bind(this))
    }

    OnShow() {
        this.binder.listHead.Refresh(0)
    }

    private fill_head(item: headNodeBinder, index: number){
        
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btnSubmit) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
}