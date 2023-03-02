using System.Collections.Generic;
using System.IO;
using UnityEngine;
using TS.UI;

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
            var panelPath = Path.Combine(Const.TsPanelFolder, panelFileName);
            //Generate if file not exists
            if (!File.Exists(panelPath))
            {
                var panelGenerator = new PanelFileGenerator(bindRoot);
                File.WriteAllText(panelPath, panelGenerator.GenerateContent());
                Debug.Log($"{panelPath} generated");
            }

            //Always Generate binder file
            var binderFileName = $"{bindRoot.NodeName}Binder.ts";
            var binderPath = Path.Combine(Const.TsBinderFolder, binderFileName);

            var binderGenerator = new PanelBinderFileGenerator(bindRoot);
            File.WriteAllText(binderPath, binderGenerator.GenerateContent());
            Debug.Log($"{binderPath} generated");
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
    }
}