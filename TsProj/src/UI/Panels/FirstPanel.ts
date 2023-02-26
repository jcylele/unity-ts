import FirstPanelBinder from "../PanelBinders/FirstPanelBinder";
import BasePanel from "../Base/BasePanel";
import CS_UI = CS.UnityEngine.UI
import {EUIPanel} from "../../Define/UIDefine";

export default class FirstPanel extends BasePanel {

    private readonly _binder: FirstPanelBinder;

    constructor() {
        super(EUIPanel.First);
        this._binder = new FirstPanelBinder(this);
    }

    public get binder(): FirstPanelBinder {
        return this._binder;
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            console.log(`btn1 clicked: ${customData}`);
            this.Hide()
        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {
            console.log(`Slider changed: ${val}`);
        }
    }
}