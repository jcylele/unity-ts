import {EUILayer, EUIPanel, EUIState} from "../Define/UIDefine";
import BasePanel from "../UI/Base/BasePanel";

let _LayeredPanelIds: Array<Array<number>>;
let _AllPanels: Map<number, BasePanel>;

export function Init() {
    _LayeredPanelIds = new Array<Array<number>>(EUILayer.Max);
    for (let layer = EUILayer.Bottom; layer < EUILayer.Max; layer++) {
        _LayeredPanelIds[layer] = new Array<number>();
    }
    _AllPanels = new Map<number, BasePanel>();

}

export function _OnPanelLoaded(uiRoot: CS.TS.UI.UiBindRoot, panelId: EUIPanel) {
    const panel = GetPanel(panelId)
    if (!panel) {
        //It's possible,not an error
        console.warn(`Panel ${panelId} Not Exist When OnPanelLoaded`)
        return
    }
    panel._Init(uiRoot)
}

// async function ImportPanel(panelName: string) {
//     const {default: module} = await import(`../UI/Panels/${panelName}`);
//     return module
// }

/**
 * Open A Panel
 * @param panelId unique identity for a panel
 * @param panelCls corresponding class, should be omitted in the future
 * @constructor
 */
export async function OpenPanel(panelId: EUIPanel, panelCls: {new(): BasePanel}) {
    //判断已有，不能重复打开
    let oldPanel = GetPanel(panelId);
    if (oldPanel) {
        console.error(`PanelId Already Open: ${panelId}`);
        return;
    }

    //TODO dynamic import panel class, no need to specify class
    // const panelConfig = GetPanelConfig(panelId)
    // if (!panelConfig) {
    //     throw new Error(`No PanelConfig For PanelId: ${panelId}`);
    // }
    // const panelCls = await ImportPanel(`../UI/Panels/${panelConfig.clsName}`)

    const panel = new panelCls()
    if (panel.config.id !== panelId){
        throw new Error("Error In OpenPanel, mismatch between panelId and panelCls")
    }
    //ID压入所属层
    let layer = panel.config.layer;
    _LayeredPanelIds[layer].push(panelId);
    //存panel对象
    _AllPanels.set(panelId, panel);

    //load prefab
    panel._OnEnterNewState(EUIState.Loading)
}

export function ShowPanel(panelId: EUIPanel) {
    GetPanel(panelId)?.Show()
}

export function HidePanel(panelId: EUIPanel) {
    GetPanel(panelId)?.Hide()
}

export function ClosePanel(panelId: EUIPanel): void {
    GetPanel(panelId)?.Close()
}

export function _OnPanelClosed(panelId: EUIPanel) {
    let panel = GetPanel(panelId);
    if (!panel) {
        return;
    }
    let idList = _LayeredPanelIds[panel.config.layer];
    for (let i = idList.length - 1; i >= 0; i--) {
        if (idList[i] == panelId) {
            idList.splice(i);
            break;
        }
    }
    _AllPanels.delete(panelId);
}

export function GetPanel<T extends BasePanel>(panelId: EUIPanel): T|undefined {
    return _AllPanels.get(panelId) as T;
}

function PrintPanels() {
    for (let i = _LayeredPanelIds.length - 1; i >= 0; i--) {
        const panels = _LayeredPanelIds[i];
        for (let j = panels.length - 1; j >= 0; j--) {
            const panelId = panels[j];
            console.log(EUIPanel[panelId]);
        }
    }
}
