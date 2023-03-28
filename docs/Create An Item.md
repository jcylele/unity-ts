# Create An Item

In this framework, nearly all data are treated as items which are stored in their belonged bags and managed by ItemMgr.ts

For an item, there are few important properties

| field name | description                                         |
| ---------- | --------------------------------------------------- |
| Item Type  | determines which bag it belongs to                  |
| Key        | an item can be easily accessed by it's type and key |
| base       | dynamic attributes of a specific item               |
| config     | static attributes of a specific item                |

For some item types, there will be multiple items and each has a unique key for accessing

These items derive from Base Item

Whereas there will be only one item for some item types which are called Singleton

These items derive from Singleton Item and key is 0

```typescript
//get item by item type and key
const propItem = GetItem<PropItem>(EItemType.Prop, id)
//get singleton item
const adventure = GetItem<AdventureItem>(EItemType.Adventure)
```

**steps to add a new type of item**

1. Add the new item type to enum EItemType in file ItemDefine.ts
2. Add a class file for the new item type

A typical item class is like [PropItem.ts](../TsProj/src/Item/Items/PropItem.ts)

**Attributes**

all attributes of an item is split into 3 categories:

1. static

   static attributes are constant values shared by many items with identical sid

   these data can be accessed by functions like GetXXXConfig which can be called in any place

   but declare a config field in item class is more convenience

   ```typescript
   const propItem = GetItem<PropItem>(EItemType.Prop, index)
   //use config
   item.itemIcon.imgIcon.SetTexture(propItem.config.icon)
   //without config
   const propConfig = GetPropConfig(propItem.Key)
   item.itemIcon.imgIcon.SetTexture(propConfig.icon)
   ```

   

2. dynamic

   dynamic attributes are unique to each item and usually got from server

   these attributes are important and should not be accessed or even changed directly by other modules
   
   classes derived from BaseAttr are used to keep dynamic attributes in an item
   
   attributes can only be altered by  public functions which are decorated with @AttrSetter
   
   this decorator will be explained in below
   
3. cached

   all relevant values can be calculated with dynamic and static attributes of an item

   but reduplicate calculation is trouble maker, so cache is introduced to tackle this

   ```typescript
   readonly attr_list: CachedValue<AttrPair[]>
   constructor(sData: HeroItemMsg) {
       this.attr_list = new CachedValue(this, this.CalcAttr);
   }
   CalcAttr(): AttrPair[] {
   }
   ```

   fields of type CachedValue<T> are cached attributes, it can be calculated by other attributes and sometimes data from others modules

   the real value will be calculated and cached when the Value is read for the first time

   following read get the cached value

   until functions with @AttrSetter decorator are called

   the cached value will be cleared, and the next read will trigger a calculation and so on
