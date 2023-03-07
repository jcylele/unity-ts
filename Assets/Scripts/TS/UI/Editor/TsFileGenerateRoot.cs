using System.Collections.Generic;
using System.IO;
using UnityEngine;
using TS.UI;
using UnityEditor;

namespace TS.Editor
{
    public class TsFileGenerateRoot
    {
        private static readonly Dictionary<string, string> CsTypeNameMap
            = new Dictionary<string, string>()
            {
                { "UnityEngine.UI", "CS_UI" },
                { "TS.UI", "TS_UI" }
            };

        public static void GenerateTsPanelFiles(UiBindRoot bindRoot)
        {
            var panelFileName = $"{bindRoot.NodeName}.ts";
            var panelPath = Path.Combine(EditorConst.TsPanelFolder, panelFileName);
            //Generate if file not exists
            if (!File.Exists(panelPath))
            {
                var panelGenerator = new PanelFileGenerator(bindRoot);
                File.WriteAllText(panelPath, panelGenerator.GenerateContent());
                Debug.Log($"{panelPath} generated");
            }

            //Always Generate binder file
            var binderPath = $"{EditorConst.TsPanelBinderFolder}\\{JsTypeName(bindRoot)}.ts";

            var binderGenerator = new BinderFileGenerator(bindRoot);
            File.WriteAllText(binderPath, binderGenerator.GenerateContent());
            Debug.Log($"{binderPath} generated");
        }

        public static void GenerateTsWidgetFiles(UiBindNode bindNode)
        {
            var binderPath = $"{EditorConst.TsWidgetBinderFolder}\\{JsTypeName(bindNode)}.ts";

            var binderGenerator = new BinderFileGenerator(bindNode);
            File.WriteAllText(binderPath, binderGenerator.GenerateContent());
            Debug.Log($"{binderPath} generated");
        }

        public static string JsTypeName(UiBindNode bindNode)
        {
            var postfix = bindNode is UiBindRoot ? "Binder" : "NodeBinder";
            return $"{bindNode.NodeName}{postfix}";
        }

        public static string JsSuperName(UiBindNode bindNode)
        {
            return bindNode is UiBindRoot ? "BasePanelBinder" : "BaseNodeBinder";
        }

        public static string CsTypeName(Component component)
        {
            var type = component.GetType();
            //shortcuts for usual namespaces
            if (CsTypeNameMap.TryGetValue(type.Namespace, out var alias))
            {
                return $"{alias}.{type.Name}";
            }

            //in ts, all C# namespaces are under CS namespace
            Debug.LogWarning($"Unexpected type in ts panels");
            return $"CS.{type.FullName}";
        }

        #region Game Config

        private static void GenerateTsConfigFile(string assetPath)
        {
            var configName = Path.GetFileNameWithoutExtension(assetPath);
            var configPath = $"{EditorConst.TsConfigScriptFolder}\\{configName}.ts";

            var content = new GameConfigFileGenerator(assetPath).GenerateContent();
            File.WriteAllText(configPath, content);
            Debug.Log($"{configPath} generated");
        }

        [MenuItem("Assets/Generate/Ts Config File", validate = true)]
        private static bool ValidateGenerateTsConfigFile(MenuCommand menuCommand)
        {
            foreach (var guid in Selection.assetGUIDs)
            {
                var assetPath = AssetDatabase.GUIDToAssetPath(guid);
                if (assetPath.EndsWith(".json"))
                {
                    return true;
                }
            }
            return false;
        }

        [MenuItem("Assets/Generate/Ts Config File")]
        private static void GenerateTsConfigFile(MenuCommand menuCommand)
        {
            foreach (var guid in Selection.assetGUIDs)
            {
                var assetPath = AssetDatabase.GUIDToAssetPath(guid);
                if (assetPath.EndsWith(".json"))
                {
                    GenerateTsConfigFile(assetPath);
                }
            }
        }

        #endregion
    }
}