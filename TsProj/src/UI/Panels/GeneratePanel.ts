import {GeneratePanelBinder} from "../PanelBinders/GeneratePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";

import CS_UI = CS.UnityEngine.UI;
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components


import {GetItem, GetItemByIndex, GetItemCount} from "../../Mgrs/ItemMgr";
import {EItemType} from "../../Define/ItemDefine";
import {PropItem} from "../../Item/Items/PropItem";
import {RegEventHandler, UnregEventHandler} from "../../Mgrs/EventMgr";
import {EEventID} from "../../Define/EventDefine";
import {SendAllItemsMsg} from "../../Ctrls/ItemCtrl";
import {FormatText, GetText} from "../../Common/Text";
import {SelectableItemIconNodeBinder} from "../WidgetBinders/SelectableItemIconNodeBinder";

export class GeneratePanel extends BasePanel {
    static panelId: EPanelId = EPanelId.Generate

    private readonly _binder: GeneratePanelBinder;

    private handlerId : number

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
        this.handlerId = RegEventHandler(EEventID.BagChanged, this.OnBagChanged.bind(this))
    }

    private OnBagChanged(eventData: EItemType, eventId: EEventID) {
        this.binder.listHead.SetItemCount(GetItemCount(EItemType.Prop))
    }

    OnShow() {
        this.binder.listHead.SetItemCount(GetItemCount(EItemType.Prop))
        SendAllItemsMsg()
    }

    private fill_SelectableItemIcon(item: SelectableItemIconNodeBinder, index: number) {
        const propItem = GetItemByIndex<PropItem>(EItemType.Prop, index)
        item.itemIcon.imgIcon.SetTexture(propItem.config.icon)
        this.AddClickListener(item.btnSelect, index)
        item.imgSelected.SetActive(this.binder.listHead.SelectedIndex === index)
    }

    private OnItemSelected(index: number){
        const propItem = GetItemByIndex<PropItem>(EItemType.Prop, index)
        this.binder.rimgIcon.SetTexture(propItem.config.icon)
        // this.binder.txtCount.text = FormatText("Price", propItem.config.price)
        this.binder.txtCount.text = propItem.toString()
    }

    OnClick(btn: CS_UI.Button, customData: any): void {
        if (btn === this.binder.btnSubmit) {
            const propItem = GetItemByIndex<PropItem>(EItemType.Prop, this.binder.listHead.SelectedIndex)
            propItem.addCount(1)
        } else {
            this.binder.listHead.SelectItem(customData)
            this.OnItemSelected(customData)
        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {
        
    }
    
    OnHide() {
    
    }

    OnClose() {
        this.handlerId = UnregEventHandler(this.handlerId)
    }
}