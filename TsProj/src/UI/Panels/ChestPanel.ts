import {ChestPanelBinder, itemNodeBinder} from "../PanelBinders/ChestPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";

import {SendAllItemsMsg} from "../../Ctrls/ItemCtrl";
import {GetItem} from "../../Mgrs/ItemMgr";
import {HeroItem} from "../../Item/Items/HeroItem";
import {EItemType} from "../../Define/ItemDefine";
import CS_UI = CS.UnityEngine.UI;

export class ChestPanel extends BasePanel {
    static panelId: EPanelId = EPanelId.Chest

    private readonly _binder: ChestPanelBinder;

    constructor() {
        super(ChestPanel.panelId);
        this._binder = new ChestPanelBinder(this);
    }

    get binder(): ChestPanelBinder {
        return this._binder;
    }

    OnInit() {


        this.binder.listBtn.SetFuncFillItem(this.fill_item.bind(this))

        SendAllItemsMsg()
    }

    OnShow() {
        this.binder.listBtn.SetItemCount(0)
    }

    private fill_item(item: itemNodeBinder, index: number) {
        this.AddClickListener(item.btn, index)
        item.txt.text = index.toString()
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        this.binder.imgChest.imgIcon.SetTexture(`UI/Textures/chest${(customData%4)+1}`)
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {

    }
}