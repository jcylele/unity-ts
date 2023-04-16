import {AdventurePanelBinder, taskItemNodeBinder} from "../PanelBinders/AdventurePanelBinder";
import {BasePanel} from "../Base/BasePanel";
import {EPanelId} from "../../Define/UIDefine";
import {GetItem} from "../../Mgrs/ItemMgr";
import {AdventureItem} from "../../Item/Items/AdventureItem";
import {EItemType} from "../../Define/ItemDefine";
import {FormatTaskState, GetCurrentTaskCount} from "../../Ctrls/AdventureCtrl";
import {GetTaskConfig} from "../../Item/Configs/TaskConfig";
import {SelectableItemIconNodeBinder} from "../WidgetBinders/SelectableItemIconNodeBinder";
import {GetRewardConfig} from "../../Item/Configs/RewardConfig";
import {GetPropConfig} from "../../Item/Configs/PropConfig";
import {ETaskState} from "../../Define/TaskDefine";
import CS_UI = CS.UnityEngine.UI;
import TweenTiming = CS.UITween.TweenTiming;
import {HeroItem} from "../../Item/Items/HeroItem";
import {Info} from "../../Common/Log";


export class AdventurePanel extends BasePanel {
    static panelId: EPanelId = EPanelId.Adventure

    private readonly _binder: AdventurePanelBinder;

    constructor() {
        super(AdventurePanel.panelId);
        this._binder = new AdventurePanelBinder(this);
    }

    get binder(): AdventurePanelBinder {
        return this._binder;
    }

    OnInit() {
        this.binder.tasks.SetFuncFillItem(this.fill_taskItem.bind(this))
    }

    OnShow() {
        const adventureItem = GetItem<AdventureItem>(EItemType.Adventure)

        this.binder.txtName.text = adventureItem.config.name
        this.binder.txtDesc.text = adventureItem.config.desc
        this.binder.tasks.SetItemCount(GetCurrentTaskCount())
    }

    OnTweenComplete(timing: TweenTiming, tweenName: string) {
        Info(`OnTweenComplete: ${timing}-${tweenName}`)
    }

    /**
     * fill the reward item
     * @private
     */
    private fill_rewardItem(item: SelectableItemIconNodeBinder, index: number, taskId: number) {
        const taskConfig = GetTaskConfig(taskId)
        const rewardConfig = GetRewardConfig(taskConfig.reward_id)
        //TODO dynamically change the item prefab according to the item type
        const tab_item = rewardConfig.reward_items[index]
        const itemConfig = GetPropConfig(tab_item[1])
        item.itemIcon.imgIcon.SetTexture(itemConfig.icon)
        item.itemIcon.txtCount.text = tab_item[2].toString()
    }

    /**
     * fill the task item
     * @private
     */
    private fill_taskItem(item: taskItemNodeBinder, index: number) {
        const adventureItem = GetItem<AdventureItem>(EItemType.Adventure)

        const taskId = adventureItem.config.task_ids[index]
        const taskConfig = GetTaskConfig(taskId)
        //task name and desc
        item.txtName.text = taskConfig.name
        item.txtDesc.text = taskConfig.desc
        //reward items
        item.rewards.SetFuncFillItem(this.fill_rewardItem.bind(this), taskId)
        const rewardConfig = GetRewardConfig(taskConfig.reward_id)
        item.rewards.SetItemCount(rewardConfig.reward_items.length)
        // display of task state
        const taskState = adventureItem.base.GetTaskState(index)
        item.btnGet.interactable = taskState == ETaskState.CanTake
        item.txtBtn.text = FormatTaskState(taskState)
    }

    OnClick(btn: CS_UI.Button, customData: any): void {

    }

    OnSlider(slider: CS_UI.Slider, val: number, customData: any): void {

    }

    OnHide() {

    }

    OnClose() {

    }
}