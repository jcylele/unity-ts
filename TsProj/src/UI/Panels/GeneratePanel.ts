import {GeneratePanelBinder} from "../PanelBinders/GeneratePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI
import {IconNodeBinder} from "../WidgetBinders/IconNodeBinder";

export class GeneratePanel extends BasePanel {
    static panelId: EPanelId = EPanelId.Generate

    private readonly _binder: GeneratePanelBinder;

    constructor() {
        super(GeneratePanel.panelId);
        this._binder = new GeneratePanelBinder(this);
    }

    get binder(): GeneratePanelBinder {
        return this._binder;
    }

    OnInit() {
        this.AddClickListener(this.binder.btnSubmit)
        
        this.binder.listHead.SetFuncFillItem(this.fill_Icon.bind(this))
    }

    OnShow() {
        this.binder.listHead.Refresh(40)
    }

    private fill_Icon(item: IconNodeBinder, index: number){
        item.Icon.SetTexture(`UI/Textures/chest${(index%4)+1}`)
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btnSubmit) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
}