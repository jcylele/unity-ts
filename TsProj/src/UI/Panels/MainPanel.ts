import {MainPanelBinder} from "../PanelBinders/MainPanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {EItemType} from "../../Define/ItemDefine";
import {GetAdventureInfo, RequestAdventure} from "../../Ctrls/AdventureCtrl";
import {CancelObserve, ObserveBag} from "../../Mgrs/ItemMgr";
import CS_UI = CS.UnityEngine.UI;
import {OpenPanel} from "../../Mgrs/UIMgr";
import {AdventurePanel} from "./AdventurePanel";
import {Info} from "../../Common/Log";


export class MainPanel extends BasePanel {
    static panelId: EPanelId = EPanelId.Main

    private readonly _binder: MainPanelBinder;

    constructor() {
        super(MainPanel.panelId);
        this._binder = new MainPanelBinder(this);
    }

    get binder(): MainPanelBinder {
        return this._binder;
    }

    private observeId: number = 0

    OnInit() {
        this.AddClickListener(this.binder.btnAdventure)
        this.AddClickListener(this.binder.btnBag)
        this.AddClickListener(this.binder.btnHero)
    }

    OnShow() {

    }


    async OnClick(btn: CS_UI.Button, customData: any) {
        if (btn === this.binder.btnAdventure) {
            // this.observeId = ObserveBag(EItemType.Adventure, this.OnBagChanged.bind(this))
            // RequestAdventure()
            const a = await GetAdventureInfo()
            Info(a)
            OpenPanel(AdventurePanel)
        } else if (btn === this.binder.btnBag) {

        } else if (btn === this.binder.btnHero) {

        }
    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {

    }

    OnHide() {

    }

    OnClose() {

    }

    OnBagChanged(itemType: EItemType) {
        if (itemType == EItemType.Adventure) {
            OpenPanel(AdventurePanel)
            this.observeId = CancelObserve(this.observeId)
        }
    }
}