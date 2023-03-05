/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder"
import {BaseNodeBinder} from "../Base/BaseNodeBinder"
import {ListView} from "../Base/ListView"

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class IconNodeBinder extends BaseNodeBinder {
    
    private _Icon: TS_UI.TsRawImage 
    public get Icon(): TS_UI.TsRawImage { 
        return this._Icon
    }
    
    protected BindComponents() {
        
        this._Icon = this.GetBindComponent('Icon') as TS_UI.TsRawImage
        
    }
}

