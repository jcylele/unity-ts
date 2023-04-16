// manager for events related to unity ui components(buttons, sliders...)

import {EUIListener, EPanelId} from "../Define/UIDefine";
import {GetPanel} from "./UIMgr";
import {AddButtonClick, AddSlideChange} from "../CsUtil";
import CS_UI = CS.UnityEngine.UI
import Component = CS.UnityEngine.Component;
import TweenTiming = CS.UITween.TweenTiming;

type Listener = { panelId: EPanelId, customData: any };
const _BindListeners = new Map<EUIListener, Map<Component, Listener>>();

export function Init() {

}

export function AddListener(listenerType: EUIListener, component: Component, panelId: EPanelId, customData: any) {
    let map = _BindListeners.get(listenerType);
    if (!map) {
        map = new Map<Component, Listener>();
        _BindListeners.set(listenerType, map);
    }
    //add listener on the C# side
    switch (listenerType) {
        case EUIListener.Click:
            AddButtonClick(component)
            break;
        case EUIListener.Slide:
            AddSlideChange(component)
            break
        default:
            Error(`Invalid listenerType ${listenerType} in AddListener`)
            break;
    }
    // add or replace old binding
    map.set(component, {panelId: panelId, customData: customData});
}

export function RemoveListener(listenerType: EUIListener, component: Component, panelId: EPanelId): boolean {
    const map = _BindListeners.get(listenerType);
    if (!map) {
        Error("TODO") //TODO
        return false;
    }
    const listener = map.get(component)
    if (listener === undefined) {
        Error("TODO") //TODO
        return false;
    }
    if (listener.panelId !== panelId) {
        Error("TODO") //TODO
        return false;
    }
    map.delete(component)
    //don't have to remove the listener in C#, it's not linked to ts directly
    return true
}

function InvokeListener(listenerType: EUIListener, component: Component, val?: any): void {
    let typeMap = _BindListeners.get(listenerType);
    if (!typeMap) {
        Error("TODO")//TODO
        return;
    }
    let listener = typeMap.get(component);
    if (!listener) {
        Error("TODO")//TODO
        return;
    }
    let panel = GetPanel(listener.panelId);
    if (!panel) {
        Error("TODO")//TODO
        return;
    }

    switch (listenerType) {
        case EUIListener.Click:
            panel.OnClick(component as CS_UI.Button, listener.customData);
            break;
        case EUIListener.Slide:
            panel.OnSlider(component as CS_UI.Slider, val, listener.customData);
            break
        default:
            Error(`Invalid listenerType ${listenerType} in InvokeListener`)
            break;
    }
}


export function _OnButtonClick(btn: CS_UI.Button) {
    InvokeListener(EUIListener.Click, btn)
}

export function _OnSliderChange(slider: CS_UI.Slider, val: number) {
    InvokeListener(EUIListener.Slide, slider, val)
}

export function _OnTweenComplete(panelId: EPanelId, timing: TweenTiming, tweenName: string) {
    let panel = GetPanel(panelId);
    if (!panel) {
        Error("TODO")//TODO
        return;
    }
    panel.OnTweenComplete(timing, tweenName);
}