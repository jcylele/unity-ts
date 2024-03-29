/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {ContainerViewSelectable} from "../Components/ContainerViewSelectable";
import {SelectableItemIconNodeBinder} from "../WidgetBinders/SelectableItemIconNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class GeneratePanelBinder extends BasePanelBinder {
    
    private _btnSubmit: CS_UI.Button 
    public get btnSubmit(): CS_UI.Button { 
        return this._btnSubmit
    }
    
    private _listHead: ContainerViewSelectable<SelectableItemIconNodeBinder> 
    public get listHead(): ContainerViewSelectable<SelectableItemIconNodeBinder> { 
        return this._listHead
    }
    
    private _rimgIcon: TS_Comp.TsRawImage 
    public get rimgIcon(): TS_Comp.TsRawImage { 
        return this._rimgIcon
    }
    
    private _txtCount: CS_UI.Text 
    public get txtCount(): CS_UI.Text { 
        return this._txtCount
    }
    
    protected BindComponents() {
        
        this._btnSubmit = this.GetBindComponent('btnSubmit') as CS_UI.Button
        
        this._listHead = new ContainerViewSelectable<SelectableItemIconNodeBinder>(SelectableItemIconNodeBinder)
        const cs_listHead = this.GetBindComponent('listHead') as TS_Comp.ScrollView
        this._listHead.Bind(cs_listHead)
        
        this._rimgIcon = this.GetBindComponent('rimgIcon') as TS_Comp.TsRawImage
        
        this._txtCount = this.GetBindComponent('txtCount') as CS_UI.Text
        
    }
}

