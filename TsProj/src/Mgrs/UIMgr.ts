import {EUILayer, EPanelId, EUIState} from "../Define/UIDefine";
import { BasePanel } from "../UI/Base/BasePanel";

let _LayeredPanelIds: EPanelId[][];
let _AllPanels: Map<EPanelId, BasePanel>;
const layerSortOrderBase = 10000
const panelSortOrderOffset = 10

export function Init() {
    _LayeredPanelIds = [];
    for (let layer = EUILayer.Bottom; layer < EUILayer.Max; layer++) {
        _LayeredPanelIds[layer] = []
    }
    _AllPanels = new Map<EPanelId, BasePanel>();
}

export function _OnPanelLoaded(uiRoot: CS.TS.UI.UiBindRoot, panelId: EPanelId) {
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
 * @param panelCls TODO corresponding class, should be replaced by panelId after dynamic import
 * @constructor
 */
export async function OpenPanel(panelCls: { new(): BasePanel, panelId : EPanelId }, panelArg?: any) {
    //only one instance for each panel
    let oldPanel = GetPanel(panelCls.panelId);
    if (oldPanel) {
        // console.warn(`PanelId Already Open: ${panelId}`);
        //just show
        oldPanel.Show(panelArg)
        return;
    }

    // dynamic import panel class, no need to specify class
    // const panelConfig = GetPanelConfig(panelId)
    // if (!panelConfig) {
    //     throw new Error(`No PanelConfig For PanelId: ${panelId}`);
    // }
    // const panelCls = await ImportPanel(`../UI/Panels/${panelConfig.clsName}`)

    const panel = new panelCls()
    //ID压入所属层
    let layer = panel.config.layer;
    _LayeredPanelIds[layer].push(panel.panelId);
    //存panel对象
    _AllPanels.set(panel.panelId, panel);

    //set arg
    panel.panel_arg = panelArg

    //load prefab
    panel._OnEnterNewState(EUIState.Loading)
}

/**
 * @deprecated use OpenPanel instead
 */
function ShowPanel(panelId: EPanelId) {
    GetPanel(panelId)?.Show()
}

export function _BringPanelToTop(panel: BasePanel) {
    const panelId = panel.panelId
    const layer = panel.config.layer
    const idList = _LayeredPanelIds[layer];
    //move id to the end
    if (idList[idList.length-1] != panelId) {
        for (let i = idList.length - 1; i >= 0; i--) {
            if (idList[i] == panelId) {
                idList.splice(i, 1);
                break;
            }
        }
        idList.push(panelId)
    }

    //set order
    if (idList.length > 1) {
        const prePanelId = idList[idList.length - 2]
        const prePanel = GetPanel(prePanelId)
        panel.sort_order = prePanel.sort_order + panelSortOrderOffset
    } else {
        panel.sort_order = layerSortOrderBase * layer
    }

    //for debug, if two panels show each other repeatedly, this may happen
    if (panel.sort_order >= layerSortOrderBase * (layer + 1)) {
        throw new Error("sort_order exceed limit, how do you make it")
    }
}

export function HidePanel(panelId: EPanelId) {
    GetPanel(panelId)?.Hide()
}

export function ClosePanel(panelId: EPanelId): void {
    GetPanel(panelId)?.Close()
}

export function _OnPanelClosed(panel: BasePanel) {
    const panelId = panel.panelId
    let idList = _LayeredPanelIds[panel.config.layer];
    for (let i = idList.length - 1; i >= 0; i--) {
        if (idList[i] == panelId) {
            idList.splice(i);
            break;
        }
    }
    _AllPanels.delete(panelId);
}

export function GetPanel<T extends BasePanel>(panelId: EPanelId): T | undefined {
    return _AllPanels.get(panelId) as T;
}

function PrintPanels() {
    for (let i = _LayeredPanelIds.length - 1; i >= 0; i--) {
        const panels = _LayeredPanelIds[i];
        for (let j = panels.length - 1; j >= 0; j--) {
            const panelId = panels[j];
            console.log(EPanelId[panelId]);
        }
    }
}
