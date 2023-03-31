//All calls to C# should be placed here

import Component = CS.UnityEngine.Component
import CS_UI = CS.UnityEngine.UI

let Singleton: CS.TS.Singleton

export function Init() {
    Singleton = CS.TS.Singleton.Instance
}

export function LoadPanel(panelPath: string, panelId: number) {
    Singleton.UiManager.LoadPanel(panelPath, panelId)
}

export function AddButtonClick(component: Component) {
    Singleton.UiEventManager.AddButtonClick(component as CS_UI.Button);
}

export function AddSlideChange(component: Component) {
    Singleton.UiEventManager.AddSlideChange(component as CS_UI.Slider);
}

export function LoadJson(path: string): any {
    const strJson = Singleton.UiManager.LoadJson(path)
    return JSON.parse(strJson)
}
