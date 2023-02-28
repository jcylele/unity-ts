/**
 *  this is an auto-generated file, do not change it manually
 */
import BasePanelBinder from "../Base/BasePanelBinder";
import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export default class FirstPanelBinderBinder extends BasePanelBinder {
    
    private _slider1: CS_UI.Slider 
    public get slider1(): CS_UI.Slider { 
        return this._slider1
    }
    
    private _btn1: CS_UI.Button 
    public get btn1(): CS_UI.Button { 
        return this._btn1
    }
    
    protected BindComponents() {
        
        this._slider1 = this.GetBindComponent('slider1') as CS_UI.Slider;
        this.AddSlideListener(this._slider1)
        
        this._btn1 = this.GetBindComponent('btn1') as CS_UI.Button;
        this.AddClickListener(this._btn1)
        
    }
}