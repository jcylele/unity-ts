/**
 * UI常量和枚举定义
 */

/**
 * UI层级
 */
export enum EUILayer {
    Bottom,
    Main,
    Window,
    Pop,
    Tip,
    Max
}

/**
 * UI界面ID
 */
export enum EPanelId {
    None,
    First = 1001,
    Generate = 1002,
}

export enum EUIState {
    None,
    Loading,
    Showing,
    Hiding,
    Closing,
}

export enum EUIListener{
    None,
    Click,
    Slide,
}