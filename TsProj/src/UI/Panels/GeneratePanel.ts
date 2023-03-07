import {GeneratePanelBinder} from "../PanelBinders/GeneratePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI
import {SelectableItemIconNodeBinder} from "../WidgetBinders/SelectableItemIconNodeBinder";

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

        this.binder.listHead.SetFuncFillItem(this.fill_SelectableItemIcon.bind(this))
    }

    OnShow() {
        this.binder.listHead.SetItemCount(20)
    }

    private fill_SelectableItemIcon(item: SelectableItemIconNodeBinder, index: number) {
        item.itemIcon.imgIcon.SetTexture(`UI/Textures/chest${(index % 4) + 1}`)
        this.AddClickListener(item.btnSelect, index)
        item.imgSelected.SetActive(this.binder.listHead.SelectedIndex === index)
    }

    private OnItemSelected(index: number){
        this.binder.rimgIcon.SetTexture(`UI/Textures/chest${(index % 4) + 1}`)
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btnSubmit) {

        } else {
            this.binder.listHead.SelectItem(customData)
            this.OnItemSelected(customData)
        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {

    }
}