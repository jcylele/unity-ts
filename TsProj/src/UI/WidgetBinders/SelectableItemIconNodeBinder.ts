/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {ItemIconNodeBinder} from "../WidgetBinders/ItemIconNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class SelectableItemIconNodeBinder extends BaseNodeBinder {
    
    private _btnSelect: CS_UI.Button 
    public get btnSelect(): CS_UI.Button { 
        return this._btnSelect
    }
    
    private _imgSelected: TS_Comp.TsImage 
    public get imgSelected(): TS_Comp.TsImage { 
        return this._imgSelected
    }
    
    private _itemIcon: ItemIconNodeBinder 
    public get itemIcon(): ItemIconNodeBinder { 
        return this._itemIcon
    }
    
    protected BindComponents() {
        
        this._btnSelect = this.GetBindComponent('btnSelect') as CS_UI.Button
        
        this._imgSelected = this.GetBindComponent('imgSelected') as TS_Comp.TsImage
        
        this._itemIcon = new ItemIconNodeBinder()
        const cs_itemIcon = this.GetBindComponent('itemIcon') as TS_UI.UiBindProxy
        this._itemIcon.Bind(cs_itemIcon.Node)
        
    }
}

