/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {ListView} from "../Components/ListView";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class FirstPanelBinder extends BasePanelBinder {
    
    private _btn1: CS_UI.Button 
    public get btn1(): CS_UI.Button { 
        return this._btn1
    }
    
    private _leftBar: leftBarNodeBinder 
    public get leftBar(): leftBarNodeBinder { 
        return this._leftBar
    }
    
    private _rightList: ListView<rightItemNodeBinder> 
    public get rightList(): ListView<rightItemNodeBinder> { 
        return this._rightList
    }
    
    private _slider1: CS_UI.Slider 
    public get slider1(): CS_UI.Slider { 
        return this._slider1
    }
    
    protected BindComponents() {
        
        this._btn1 = this.GetBindComponent('btn1') as CS_UI.Button
        
        this._leftBar = new leftBarNodeBinder()
        const cs_leftBar = this.GetBindComponent('leftBar') as TS_UI.UiBindNode
        this._leftBar.Bind(cs_leftBar)
        
        this._rightList = new ListView<rightItemNodeBinder>(rightItemNodeBinder)
        const cs_rightList = this.GetBindComponent('rightList') as TS_Comp.ScrollView
        this._rightList.Bind(cs_rightList)
        
        this._slider1 = this.GetBindComponent('slider1') as CS_UI.Slider
        
    }
}

export class leftBarNodeBinder extends BaseNodeBinder {
    
    private _btnLeft: CS_UI.Button 
    public get btnLeft(): CS_UI.Button { 
        return this._btnLeft
    }
    
    private _imgBox: TS_Comp.TsRawImage 
    public get imgBox(): TS_Comp.TsRawImage { 
        return this._imgBox
    }
    
    private _txtTitle: CS_UI.Text 
    public get txtTitle(): CS_UI.Text { 
        return this._txtTitle
    }
    
    protected BindComponents() {
        
        this._btnLeft = this.GetBindComponent('btnLeft') as CS_UI.Button
        
        this._imgBox = this.GetBindComponent('imgBox') as TS_Comp.TsRawImage
        
        this._txtTitle = this.GetBindComponent('txtTitle') as CS_UI.Text
        
    }
}

export class rightItemNodeBinder extends BaseNodeBinder {
    
    private _txtIndex: CS_UI.Text 
    public get txtIndex(): CS_UI.Text { 
        return this._txtIndex
    }
    
    protected BindComponents() {
        
        this._txtIndex = this.GetBindComponent('txtIndex') as CS_UI.Text
        
    }
}

