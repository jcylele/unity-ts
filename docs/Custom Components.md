# Custom Components

## UI Binding 

### Ui Bind Root

Represents a panel and is always attached to the Canvas node of a panel prefab

Keeps reference to inner components which will be accessed in TS

It's like a ui container with shortcut for some child components

See more details in [Create A Panel](Create A Panel.md)

### Ui Bind Node

UiBindNode is like UiBindRoot without canvas

It can be bound to other UiBindNode/UiBindRoot

So the ui binding structure is like a **tree** rather than a dict

It's used in a panel to group different components or as the root container of a widget

See more details in [Create A Panel](Create A Panel.md)

### Ui Bind Proxy

this is a placeholder/container for a widget

PS: all widgets are placed in ProjectRoot/Assets/Resources/UI/Prefabs/Widgets/

Click "Load Prefab" to preview the widget in editor

Click "Reset Size" to set its size to that of the prefab

![custom_component2](custom_component2.png)

## Others
### Ts Raw Image

Derived from UnityEngine.UI.RawImage

For the convenience to alter **texture** at runtime which is shown below

```typescript
this.binder.rimgIcon.SetTexture("UI/Textures/chest1");
```

### Ts Image

Derived from UnityEngine.UI.Image

For the convenience to alter **sprite** at runtime which is shown below

```typescript
this.binder.rimgIcon.SetSprite("UI/Textures/chest1");
```

### Container View

Container for multiple items instantiated from same template

![custom_component1](custom_component1.png)

- Node Provider

  the template for instantiation, can be a UiBindNode or UiBindProxy(holds reference to a widget)

  It must be descendant of the container, usually the only child of container

- Item Selectable

  if the items can be selected, check it if selected item has special display

The usual usage of Container View in TS is shown below

```typescript
    OnInit() {
        //set fill function for displaying each item
        this.binder.listHead.SetFuncFillItem(this.fill_SelectableItemIcon.bind(this))
    }
    OnShow() {
        //equals prop item count
        this.binder.listHead.SetItemCount(GetItemCount(EItemType.Prop))
    }
    private fill_SelectableItemIcon(item: SelectableItemIconNodeBinder, index: number){
        //get data to fill this item
        const propItem = GetItem<PropItem>(EItemType.Prop, index)
        //change display
        item.itemIcon.imgIcon.SetTexture(propItem.config.icon)
        //click to select item
        this.AddClickListener(item.btnSelect, index)
        //imgSelected is shown only when item is selected
        item.imgSelected.SetActive(this.binder.listHead.SelectedIndex === index)
    }
```



ContainerView is only a logic container for items, use GroupLayouts(HorizontalLayoutGroup/VerticalLayoutGroup/GridLayoutGroup) and sometimes Content Size Fitter to arrange the layout of items

Another drawback of Container View is that all items are instantiated even if they're out of screen

If the total count of items is way larger than that of items which can be seen at one time, use **Scroll View** instead

### Scroll View

Scroll View is similar to Container View, except:

- Reuse a small number of instantiated items to simulate large number of items
- doesn't supports grid layout at present
- arrange items by self, doesn't need other layout groups

![custom_component3](custom_component3.png)

Extra Count and Extra Hidden Count represents the extra number of items which are just out of screen

Don't have to adjust these two values  unless items don't appear promptly when scrolling

 In TS, the usage of Scroll View is exactly the same as Container View

