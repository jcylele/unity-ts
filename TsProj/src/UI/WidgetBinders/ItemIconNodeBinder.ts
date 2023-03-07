/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class ItemIconNodeBinder extends BaseNodeBinder {
    
    private _imgIcon: TS_UI.TsRawImage 
    public get imgIcon(): TS_UI.TsRawImage { 
        return this._imgIcon
    }
    
    protected BindComponents() {
        
        this._imgIcon = this.GetBindComponent('imgIcon') as TS_UI.TsRawImage
        
    }
}

