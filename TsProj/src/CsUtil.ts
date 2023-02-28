//All calls to C# should be placed here

let csUiManager: CS.TS.UI.UiManager = undefined
let csUiEventManager: CS.TS.UI.UiEventManager = undefined
import Component = CS.UnityEngine.Component
import CS_UI = CS.UnityEngine.UI

export function Init() {
    csUiManager = CS.TS.UI.UiManager.Instance
    csUiEventManager = CS.TS.UI.UiEventManager.Instance
}

export function LoadPanel(panelPath: string, panelId :number){
    csUiManager.LoadPanel(panelPath, panelId)
}

export function AddButtonClick(component:Component) {
    csUiEventManager.AddButtonClick(component as CS_UI.Button);
}

export function AddSlideChange(component:Component) {
    csUiEventManager.AddSlideChange(component as CS_UI.Slider);
}

export function LoadJson(path: string): any {
    const strJson = csUiManager.LoadJson(path)
    return JSON.parse(strJson)
}
