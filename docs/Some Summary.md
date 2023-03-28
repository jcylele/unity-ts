# Some Summary

## Unsolved Problems

### dynamic import

In compiled languages, all code files are compiled when building and loaded entirely at the startup of running.

While in scripting languages, a code file is loaded and interpreted when being imported or required.

There are plenty of files which will not probably be actually used during one whole play, such as configs, panels. 

So it's reasonable to not import them until needed.

Dynamic import is the best solution. 

But in puerTs framework, load of js files is hooked by the framework and I got crash when dynamically loading files. I couldn't figure out what happened, and had to suspend it for a while.

## Some Tips

###  life cycle methods

**Not** to override life cycle methods of native components

I wanted to new a custom component which is inherited from **Image**, and I override the Awake method. 

Then I found that components added in Awake remained after I quit play mode. 

After a while, I found the truth that Awake is called when I added the component in editor mode.

So I guess life cycle methods of native components are injected by Unity, by using [ExecutiveInEditor] or something like that.

so just leave them out when you wan to inherit a native component.

### generic in typescript

when using generic<T> in typescript, notice that all info about <T> is erased after compilation, 

so if you want to "new T()", you have to pass the real type as parameter to the method or class, 

something like "real_type: { new(): T ;}"

### alter prefab asset

In a mono behavior, if a field refers to a prefab asset or a component inside a prefab asset, 

you may unwittingly alter the prefab asset. 

Watch out if this is not your intention.

In most times, just instantiate instances from the prefab and modify them.

### size of Rect Transform

**rt.sizeDelta** is wrong when anchors are separated, 

for most times, you can use **rt.rect.size**  to get the right size

But if the rt is stretched on any axis, at the first frame, this method will return 0 on that axis

wait for **one frame** before using it

### callbacks center

There are many circumstances when we hold callbacks, such as timer, events and data binding.

Callbacks can be added and removed from the managers, and will be called at some time I call dispatching.

But when dispatching, adding or removing callbacks will cause unpredictable behaviors. 

It's just like altering a dictionary while traversing which throws exceptions in compiled languages actually.

So when dispatching, adding or removing requests should be kept waiting in a queue and processed after dispatching is over.

It's much like a command pattern though.

## Some Instructions

### Cross-language Coding

In this project, C# and Typescript are calling each other all the time in almost every file and they keep reference to each other which may cause undetectable bugs and potential GC  leaks.

So I choose to put all interactions under control. 

Firstly, gather these references together in two files(one for each direction), and other files are forbidden to call cross-language functions directly. 

Secondly, keep interactions as simple as possible, such as less methods and simpler parameters and specific strategies targeting different languages. 

Finally, mark cross-language methods and variables with specific prefix.

### Ui Binding

The most intuitive way to get a component in children is using the relative path and component type. But ui panels are unstable in developing which means every time you make a change to the panel prefab, you have to check if the path of component is changed.

So Unity provides a better way: Serializing Property. Declare a public field in mono behavior and assign the correct components to it in the prefab. It doesn't matter when component is moved from here to that because the field keeps the reference id.

But when developing a game on TS, we are avoiding adding new C# files. We do not add a mono behavior for each panel, so we need an universal Mono Behavior to keep reference to inner  components and access them in TS at runtime.

So I introduced UiBindNode to keep these references, each component has a specific name for accessing.

Next is the generation of TS files which is based on the UiBindNode.

More details can be found in [Custom Components](Custom Components.md) and [Create A Panel](Create A Panel.md)