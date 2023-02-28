/**
 *  this is an auto-generated file, do not change it manually
 */
import BasePanelBinder from "../Base/BasePanelBinder";
import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI

export default class GeneratePanelBinderBinder extends BasePanelBinder {
    
    private _btnSubmit: CS_UI.Button 
    public get btnSubmit(): CS_UI.Button { 
        return this._btnSubmit
    }
    
    private _txtCount: CS_UI.Text 
    public get txtCount(): CS_UI.Text { 
        return this._txtCount
    }
    
    protected BindComponents() {
        
        this._btnSubmit = this.GetBindComponent('btnSubmit') as CS_UI.Button;
        this.AddClickListener(this._btnSubmit)
        
        this._txtCount = this.GetBindComponent('txtCount') as CS_UI.Text;
        
        
    }
}