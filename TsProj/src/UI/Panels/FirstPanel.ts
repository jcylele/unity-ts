import {childNodeBinder, FirstPanelBinder} from "../PanelBinders/FirstPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {OpenPanel} from "../../Mgrs/UIMgr";
import CS_UI = CS.UnityEngine.UI;
import {ChestPanel} from "./ChestPanel";

export class FirstPanel extends BasePanel {

    private readonly _binder: FirstPanelBinder;

    constructor() {
        super(EPanelId.First);
        this._binder = new FirstPanelBinder(this);
    }

    public get binder(): FirstPanelBinder {
        return this._binder;
    }

    OnInit() {
        this.AddSlideListener(this.binder.slider1)
		this.AddClickListener(this.binder.btn1)
		this.AddClickListener(this.binder.leftBar.btnLeft)
    }

    private fillItems(item: childNodeBinder, index: number){
        item.child.text = index.toString()
        console.log(this.panelId)
    }

    OnShow() {
        this.binder.slider1.value = this.panel_arg
        this.binder.leftBar.itemList.Refresh(5, this.fillItems.bind(this))
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            this.binder.slider1.value = 0.2
        } else if (btn === this.binder.leftBar.btnLeft) {
            OpenPanel(EPanelId.Chest, ChestPanel)
        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {

        }
    }
}