/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {IconNodeBinder} from "../WidgetBinders/IconNodeBinder";
import {ListView} from "../Base/ListView";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class ChestPanelBinder extends BasePanelBinder {
    
    private _imgChest: IconNodeBinder 
    public get imgChest(): IconNodeBinder { 
        return this._imgChest
    }
    
    private _listBtn: ListView<itemNodeBinder> 
    public get listBtn(): ListView<itemNodeBinder> { 
        return this._listBtn
    }
    
    protected BindComponents() {
        
        this._imgChest = new IconNodeBinder()
        const cs_imgChest = this.GetBindComponent('imgChest') as TS_UI.UiBindProxy
        this._imgChest.Bind(cs_imgChest.Node)
        
        this._listBtn = new ListView<itemNodeBinder>(itemNodeBinder)
        const cs_listBtn = this.GetBindComponent('listBtn') as TS_UI.ScrollView
        this._listBtn.Bind(cs_listBtn)
        
    }
}

export class itemNodeBinder extends BaseNodeBinder {
    
    private _txt: CS_UI.Text 
    public get txt(): CS_UI.Text { 
        return this._txt
    }
    
    private _btn: CS_UI.Button 
    public get btn(): CS_UI.Button { 
        return this._btn
    }
    
    protected BindComponents() {
        
        this._txt = this.GetBindComponent('txt') as CS_UI.Text
        
        this._btn = this.GetBindComponent('btn') as CS_UI.Button
        
    }
}

