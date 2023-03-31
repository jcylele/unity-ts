/**
 *  this is an auto-generated file, do not change it manually
 */
import {BasePanelBinder} from "../Base/BasePanelBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class MainPanelBinder extends BasePanelBinder {
    
    private _btnAdventure: CS_UI.Button 
    public get btnAdventure(): CS_UI.Button { 
        return this._btnAdventure
    }
    
    private _btnBag: CS_UI.Button 
    public get btnBag(): CS_UI.Button { 
        return this._btnBag
    }
    
    private _btnHero: CS_UI.Button 
    public get btnHero(): CS_UI.Button { 
        return this._btnHero
    }
    
    protected BindComponents() {
        
        this._btnAdventure = this.GetBindComponent('btnAdventure') as CS_UI.Button
        
        this._btnBag = this.GetBindComponent('btnBag') as CS_UI.Button
        
        this._btnHero = this.GetBindComponent('btnHero') as CS_UI.Button
        
    }
}

