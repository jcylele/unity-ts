using UnityEngine;

namespace TS
{
    public class Const
    {
        public const int TsDebugPort = 8758;
        public const string TsScriptsPath = "TsScripts";
        public const string TsConfigsPath = "TsConfigs";
        public const string TsPanelPrefabsPath = "UI\\Prefabs";

#if UNITY_EDITOR
        public const string EditorResourcesFolder = "Assets\\EditorResources";
        public const string CustomComponentFolder = EditorResourcesFolder + "\\CustomComponents";
        public const string FileTemplateFolder = EditorResourcesFolder + "\\FileTemplates";

        public static readonly string TsPanelFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\Panels";

        public static readonly string TsBinderFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\PanelBinders";
#endif
    }
}