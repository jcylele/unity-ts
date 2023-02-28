import ChestPanelBinder from "../PanelBinders/ChestPanelBinder";
import BasePanel from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import CS_UI = CS.UnityEngine.UI

export default class ChestPanel extends BasePanel {

    private readonly _binder: ChestPanelBinder;
    public get binder(): ChestPanelBinder {
        return this._binder;
    }

    constructor() {
        super(EPanelId.Chest);
        this._binder = new ChestPanelBinder(this);
    }

    OnShow(): void {

    }

    private SetTexture(id: number) {
        this.binder.imgChest.SetTexture(`UI\\Textures\\chest${id}`)
    }

    OnClick(btn: CS_UI.Button, customData: any) {
        if (btn == this.binder.btn1) {
            this.SetTexture(1)
        } else if (btn == this.binder.btn2) {
            this.SetTexture(2)
        } else if (btn == this.binder.btn3) {
            this.SetTexture(3)
        } else if (btn == this.binder.btn4) {
            this.SetTexture(4)
        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any) {

    }
}