/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder"
import {BaseNodeBinder} from "../Base/BaseNodeBinder"
import {ListView} from "../Base/ListView"
import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export class ChestPanelBinder extends BasePanelBinder {
    
    private _imgChest: TS_UI.TsRawImage 
    public get imgChest(): TS_UI.TsRawImage { 
        return this._imgChest
    }
    
    private _btn4: CS_UI.Button 
    public get btn4(): CS_UI.Button { 
        return this._btn4
    }
    
    private _btn2: CS_UI.Button 
    public get btn2(): CS_UI.Button { 
        return this._btn2
    }
    
    private _btn1: CS_UI.Button 
    public get btn1(): CS_UI.Button { 
        return this._btn1
    }
    
    private _btn3: CS_UI.Button 
    public get btn3(): CS_UI.Button { 
        return this._btn3
    }
    
    protected BindComponents() {
        
        this._imgChest = this.GetBindComponent('imgChest') as TS_UI.TsRawImage
        
        this._btn4 = this.GetBindComponent('btn4') as CS_UI.Button
        
        this._btn2 = this.GetBindComponent('btn2') as CS_UI.Button
        
        this._btn1 = this.GetBindComponent('btn1') as CS_UI.Button
        
        this._btn3 = this.GetBindComponent('btn3') as CS_UI.Button
        
    }
}

