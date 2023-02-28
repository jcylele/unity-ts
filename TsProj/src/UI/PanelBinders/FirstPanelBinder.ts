/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder"
import {BaseNodeBinder} from "../Base/BaseNodeBinder"
import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
export class FirstPanelBinder extends BasePanelBinder {
    
    private _slider1: CS_UI.Slider 
    public get slider1(): CS_UI.Slider { 
        return this._slider1
    }
    
    private _btn1: CS_UI.Button 
    public get btn1(): CS_UI.Button { 
        return this._btn1
    }
    
    private _leftBar: leftBarNodeBinder 
    public get leftBar(): leftBarNodeBinder { 
        return this._leftBar
    }
    
    protected BindComponents() {
        
        this._slider1 = this.GetBindComponent('slider1') as CS_UI.Slider;
        
        this._btn1 = this.GetBindComponent('btn1') as CS_UI.Button;
        
        this._leftBar = new leftBarNodeBinder()
        const _leftBarNode = this.GetBindComponent('leftBar') as TS_UI.UiBindNode;
        this._leftBar.Bind(_leftBarNode)
        
    }
}
export class leftBarNodeBinder extends BaseNodeBinder {
    
    private _imgBox: TS_UI.TsRawImage 
    public get imgBox(): TS_UI.TsRawImage { 
        return this._imgBox
    }
    
    private _txtTitle: CS_UI.Text 
    public get txtTitle(): CS_UI.Text { 
        return this._txtTitle
    }
    
    private _btnLeft: CS_UI.Button 
    public get btnLeft(): CS_UI.Button { 
        return this._btnLeft
    }
    
    protected BindComponents() {
        
        this._imgBox = this.GetBindComponent('imgBox') as TS_UI.TsRawImage;
        
        this._txtTitle = this.GetBindComponent('txtTitle') as CS_UI.Text;
        
        this._btnLeft = this.GetBindComponent('btnLeft') as CS_UI.Button;
        
    }
}
