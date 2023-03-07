import {BaseNodeBinder} from "../Base/BaseNodeBinder";
import {ListView} from "./ListView";

export class ListViewSelectable<T extends BaseNodeBinder> extends ListView<T> {

    private selectedIndex = -1

    get SelectedIndex(): number{
        return this.selectedIndex
    }

    SelectItem(index: number) {
        const old = this.selectedIndex
        this.selectedIndex = index
        this.RefreshItem(old)
        this.RefreshItem(index)
    }

    RefreshItem(index: number) {
        this._uiListView.Refresh(index)
    }

    SetItemCount(count: number) {
        //deselect when data source changed
        this.selectedIndex = -1;
        super.SetItemCount(count);
    }
}