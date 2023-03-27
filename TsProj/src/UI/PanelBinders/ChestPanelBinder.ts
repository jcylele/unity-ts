/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {ContainerView} from "../Components/ContainerView";
import {ItemIconNodeBinder} from "../WidgetBinders/ItemIconNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class ChestPanelBinder extends BasePanelBinder {
    
    private _imgChest: ItemIconNodeBinder 
    public get imgChest(): ItemIconNodeBinder { 
        return this._imgChest
    }
    
    private _listBtn: ContainerView<itemNodeBinder> 
    public get listBtn(): ContainerView<itemNodeBinder> { 
        return this._listBtn
    }
    
    protected BindComponents() {
        
        this._imgChest = new ItemIconNodeBinder()
        const cs_imgChest = this.GetBindComponent('imgChest') as TS_UI.UiBindProxy
        this._imgChest.Bind(cs_imgChest.Node)
        
        this._listBtn = new ContainerView<itemNodeBinder>(itemNodeBinder)
        const cs_listBtn = this.GetBindComponent('listBtn') as TS_Comp.ScrollView
        this._listBtn.Bind(cs_listBtn)
        
    }
}

export class itemNodeBinder extends BaseNodeBinder {
    
    private _btn: CS_UI.Button 
    public get btn(): CS_UI.Button { 
        return this._btn
    }
    
    private _txt: CS_UI.Text 
    public get txt(): CS_UI.Text { 
        return this._txt
    }
    
    protected BindComponents() {
        
        this._btn = this.GetBindComponent('btn') as CS_UI.Button
        
        this._txt = this.GetBindComponent('txt') as CS_UI.Text
        
    }
}

