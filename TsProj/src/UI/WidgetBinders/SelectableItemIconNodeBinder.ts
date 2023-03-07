/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {ItemIconNodeBinder} from "../WidgetBinders/ItemIconNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class SelectableItemIconNodeBinder extends BaseNodeBinder {
    
    private _itemIcon: ItemIconNodeBinder 
    public get itemIcon(): ItemIconNodeBinder { 
        return this._itemIcon
    }
    
    private _imgSelected: TS_UI.TsImage 
    public get imgSelected(): TS_UI.TsImage { 
        return this._imgSelected
    }
    
    private _btnSelect: CS_UI.Button 
    public get btnSelect(): CS_UI.Button { 
        return this._btnSelect
    }
    
    protected BindComponents() {
        
        this._itemIcon = new ItemIconNodeBinder()
        const cs_itemIcon = this.GetBindComponent('itemIcon') as TS_UI.UiBindProxy
        this._itemIcon.Bind(cs_itemIcon.Node)
        
        this._imgSelected = this.GetBindComponent('imgSelected') as TS_UI.TsImage
        
        this._btnSelect = this.GetBindComponent('btnSelect') as CS_UI.Button
        
    }
}

