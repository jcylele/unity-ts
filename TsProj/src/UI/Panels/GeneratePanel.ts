import GeneratePanelBinder from "../PanelBinders/GeneratePanelBinder";
import BasePanel from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {OpenPanel} from "../../Mgrs/UIMgr";
import CS_UI = CS.UnityEngine.UI;
import FirstPanel from "./FirstPanel";

export default class GeneratePanel extends BasePanel {

    private readonly _binder: GeneratePanelBinder;
    public get binder(): GeneratePanelBinder {
        return this._binder;
    }

    constructor() {
        super(EPanelId.Generate);
        this._binder = new GeneratePanelBinder(this);
    }

    OnShow(): void {
        this.binder.txtCount.text = this.panel_arg
    }

    OnClick(btn: CS_UI.Button, customData: any) {
        if (btn == this.binder.btnSubmit){
            OpenPanel(EPanelId.First, FirstPanel, 0.25)
        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any) {

    }
}