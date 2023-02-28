import TS_UI = CS.TS.UI
import Component = CS.UnityEngine.Component

export abstract class BaseNodeBinder {
    protected uiRoot: TS_UI.UiBindNode = undefined

    protected constructor() {
    }

    Bind(node: TS_UI.UiBindNode) {
        this.uiRoot = node
        this.BindComponents()
    }

    protected GetBindComponent(name: string): Component {
        return this.uiRoot.get_Item(name);
    }

    protected abstract BindComponents(): void;
}