import {childNodeBinder, FirstPanelBinder, rightItemNodeBinder} from "../PanelBinders/FirstPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {OpenPanel} from "../../Mgrs/UIMgr";
import CS_UI = CS.UnityEngine.UI;
import {ChestPanel} from "./ChestPanel";
import {GeneratePanel} from "./GeneratePanel";

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

        this.binder.leftBar.itemList.SetFuncFillItem(this.fillItems.bind(this))
        this.binder.rightList.SetFuncFillItem(this.fillRightItems.bind(this))
    }

    private fillItems(item: childNodeBinder, index: number){
        item.child.text = index.toString()
    }

    private fillRightItems(item: rightItemNodeBinder, index: number){
        item.txtIndex.text = index.toString()
    }

    OnShow() {
        this.binder.slider1.value = this.panel_arg
        this.binder.leftBar.itemList.Refresh(5)
        this.binder.rightList.Refresh(50)
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            this.binder.slider1.value = 0.2
        } else if (btn === this.binder.leftBar.btnLeft) {
            OpenPanel(EPanelId.Generate, GeneratePanel)
        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {

        }
    }
}