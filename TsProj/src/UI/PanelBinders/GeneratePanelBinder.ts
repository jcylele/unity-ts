/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {IconNodeBinder} from "../WidgetBinders/IconNodeBinder";
import {ListView} from "../Base/ListView";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class GeneratePanelBinder extends BasePanelBinder {
    
    private _txtCount: CS_UI.Text 
    public get txtCount(): CS_UI.Text { 
        return this._txtCount
    }
    
    private _btnSubmit: CS_UI.Button 
    public get btnSubmit(): CS_UI.Button { 
        return this._btnSubmit
    }
    
    private _listHead: ListView<IconNodeBinder> 
    public get listHead(): ListView<IconNodeBinder> { 
        return this._listHead
    }
    
    private _rimgIcon: TS_UI.TsRawImage 
    public get rimgIcon(): TS_UI.TsRawImage { 
        return this._rimgIcon
    }
    
    protected BindComponents() {
        
        this._txtCount = this.GetBindComponent('txtCount') as CS_UI.Text
        
        this._btnSubmit = this.GetBindComponent('btnSubmit') as CS_UI.Button
        
        this._listHead = new ListView<IconNodeBinder>(IconNodeBinder)
        const cs_listHead = this.GetBindComponent('listHead') as TS_UI.ScrollView
        this._listHead.Bind(cs_listHead)
        
        this._rimgIcon = this.GetBindComponent('rimgIcon') as TS_UI.TsRawImage
        
    }
}

