/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class ItemIconNodeBinder extends BaseNodeBinder {
    
    private _imgIcon: TS_Comp.TsRawImage 
    public get imgIcon(): TS_Comp.TsRawImage { 
        return this._imgIcon
    }
    
    private _txtCount: CS_UI.Text 
    public get txtCount(): CS_UI.Text { 
        return this._txtCount
    }
    
    protected BindComponents() {
        
        this._imgIcon = this.GetBindComponent('imgIcon') as TS_Comp.TsRawImage
        
        this._txtCount = this.GetBindComponent('txtCount') as CS_UI.Text
        
    }
}

