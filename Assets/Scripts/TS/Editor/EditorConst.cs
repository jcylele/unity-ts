﻿using UnityEngine;

namespace TS
{
    internal class EditorConst
    {
        public const string EditorResourcesFolder = "Assets\\EditorResources";
        public const string CustomComponentFolder = EditorResourcesFolder + "\\CustomComponents";
        public const string FileTemplateFolder = EditorResourcesFolder + "\\FileTemplates";

        public static readonly string TsPanelFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\Panels";

        public static readonly string TsPanelBinderFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\PanelBinders";

        public static readonly string TsWidgetBinderFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\WidgetBinders";

        public static readonly string TsConfigScriptFolder =
            Application.dataPath + "\\..\\TsProj\\src\\Configs";

        public static GUILayoutOption BtnHeight = GUILayout.Height(40);
    }
}
