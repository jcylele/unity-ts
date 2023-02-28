# unity-ts
A game template based on Unity Engine and PuerTS framework which supports typescript for development

## Todo List

1. containers
2. infinite scroll



## Unsolved Problems

1. dynamic import

   There are plenty of files which will not probably be used during one whole play, such as configs, panels. So it's more reasonable to not import them until needed for which dynamic import is the best solution. But I got errors trying this, and decided to suspend it for a while.

   
## Lessons

1. **Not** to override life cycle methods of native components

   ​	I wanted to new a custom component which is inherited from **Image**, and I override the Awake method. Then I found that components added in Awake remained after I quit play mode. After a while, I found the truth that Awake is called when I added the component in editor mode.

   ​	So I guess life cycle methods of native components are injected by Unity, so just leave them out when you wan to inherit a native component.



## Some Instructions

### Cross-language Coding

​	In this project, C# and Typescript are calling each other all the time in almost every file and they keep reference to each other which may cause undetectable bugs and potential GC  leaks.

​	So I choose to put all interactions under control. Firstly, gather these references together in two files(one for each direction), and other files are forbidden to call cross-language functions directly. Secondly, keep interactions as simple as possible, such as less methods and simpler parameters and specific strategies targeting different languages. Finally, mark cross-language methods and variables with specific prefix.

### Ui binding
