/**
 *  this is an auto-generated file, do not change it manually
 */
import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {BasePanelBinder} from "../Base/BasePanelBinder";
import {ContainerView} from "../Components/ContainerView";
import {ContainerViewSelectable} from "../Components/ContainerViewSelectable";
import {SelectableItemIconNodeBinder} from "../WidgetBinders/SelectableItemIconNodeBinder";

import CS_UI = CS.UnityEngine.UI
import TS_UI = CS.TS.UI
import TS_Comp = CS.TS.UI.Components

export class AdventurePanelBinder extends BasePanelBinder {
    
    private _tasks: ContainerView<taskItemNodeBinder> 
    public get tasks(): ContainerView<taskItemNodeBinder> { 
        return this._tasks
    }
    
    private _txtDesc: CS_UI.Text 
    public get txtDesc(): CS_UI.Text { 
        return this._txtDesc
    }
    
    private _txtName: CS_UI.Text 
    public get txtName(): CS_UI.Text { 
        return this._txtName
    }
    
    protected BindComponents() {
        
        this._tasks = new ContainerView<taskItemNodeBinder>(taskItemNodeBinder)
        const cs_tasks = this.GetBindComponent('tasks') as TS_Comp.ScrollView
        this._tasks.Bind(cs_tasks)
        
        this._txtDesc = this.GetBindComponent('txtDesc') as CS_UI.Text
        
        this._txtName = this.GetBindComponent('txtName') as CS_UI.Text
        
    }
}

export class taskItemNodeBinder extends BaseNodeBinder {
    
    private _btnGet: CS_UI.Button 
    public get btnGet(): CS_UI.Button { 
        return this._btnGet
    }
    
    private _rewards: ContainerViewSelectable<SelectableItemIconNodeBinder> 
    public get rewards(): ContainerViewSelectable<SelectableItemIconNodeBinder> { 
        return this._rewards
    }
    
    private _txtBtn: CS_UI.Text 
    public get txtBtn(): CS_UI.Text { 
        return this._txtBtn
    }
    
    private _txtDesc: CS_UI.Text 
    public get txtDesc(): CS_UI.Text { 
        return this._txtDesc
    }
    
    private _txtName: CS_UI.Text 
    public get txtName(): CS_UI.Text { 
        return this._txtName
    }
    
    protected BindComponents() {
        
        this._btnGet = this.GetBindComponent('btnGet') as CS_UI.Button
        
        this._rewards = new ContainerViewSelectable<SelectableItemIconNodeBinder>(SelectableItemIconNodeBinder)
        const cs_rewards = this.GetBindComponent('rewards') as TS_Comp.ContainerView
        this._rewards.Bind(cs_rewards)
        
        this._txtBtn = this.GetBindComponent('txtBtn') as CS_UI.Text
        
        this._txtDesc = this.GetBindComponent('txtDesc') as CS_UI.Text
        
        this._txtName = this.GetBindComponent('txtName') as CS_UI.Text
        
    }
}

