import FirstPanelBinder from "../PanelBinders/FirstPanelBinder";
import BasePanel from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {OpenPanel} from "../../Mgrs/UIMgr";
import CS_UI = CS.UnityEngine.UI;
import GeneratePanel from "./GeneratePanel";

export default class FirstPanel extends BasePanel {

    private readonly _binder: FirstPanelBinder;

    constructor() {
        super(EPanelId.First);
        this._binder = new FirstPanelBinder(this);
    }

    public get binder(): FirstPanelBinder {
        return this._binder;
    }

    public OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btn1) {
            console.log(`btn1 clicked: ${customData}`);
            OpenPanel(EPanelId.Generate, GeneratePanel)
        }
    }

    public OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        if (slider === this.binder.slider1) {
            console.log(`Slider changed: ${val}`);
        }
    }
}