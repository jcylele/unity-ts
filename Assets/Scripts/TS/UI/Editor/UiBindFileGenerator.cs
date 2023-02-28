using System.Collections.Generic;
using System.IO;
using UnityEngine;
using UnityEngine.UI;
using TS.UI;
using UnityEditor;

namespace TS.Editor
{
    public class UiBindFileGenerator
    {

        public void OnSaveUiBindRoot(UiBindRoot bindRoot)
        {
            var panelFileName = $"{bindRoot.NodeName}.ts";
            var panelPath = Path.Combine(Const.TsPanelFolder, panelFileName);
            //DO NOT OverWrite
            if (!File.Exists(panelPath))
            {
                var panelContent = GeneratePanelFileContent(bindRoot);
                File.WriteAllText(panelPath, panelContent);
                Debug.Log($"{panelPath} generated");
            }

            var binderFileName = $"{bindRoot.NodeName}Binder.ts";
            var binderPath = Path.Combine(Const.TsBinderFolder, binderFileName);
            //Always Generate
            var binderContent = GenerateBinderFileContent(bindRoot);
            File.WriteAllText(binderPath, binderContent);
            Debug.Log($"{binderPath} generated");
        }

        private string GeneratePanelFileContent(UiBindRoot bindRoot)
        {
            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplatePanel.ts.txt");
            return ta.text.Replace("#TemplatePanel#", bindRoot.NodeName);
        }

        private static Dictionary<System.Type, string> _listenerTypeMap
            = new Dictionary<System.Type, string>()
            {
                { typeof(Button), "AddClickListener" },
                { typeof(Slider), "AddSlideListener" },
            };

        private static Dictionary<string, string> _typeNameMap
            = new Dictionary<string, string>()
            {
                { "UnityEngine.UI", "CS_UI" },
                { "TS.UI", "TS_UI" }
            };

        private string TypeName(System.Type type)
        {
            if (_typeNameMap.TryGetValue(type.Namespace, out var alias))
            {
                return $"{alias}.{type.Name}";
            }
            else
            {
                //in ts, all C# namespaces are under CS namespace
                Debug.LogWarning($"Unexpected type in ts panels");
                return $"CS.{type.FullName}";
            }
        }

        private string GenerateBinderFileContent(UiBindRoot bindRoot)
        {
            var className = $"{bindRoot.NodeName}Binder";
            var declareList = new List<string>(bindRoot.BindElements.Count);
            var eventList = new List<string>(bindRoot.BindElements.Count);
            foreach (var bindElement in bindRoot.BindElements)
            {
                var elemType = bindElement.ElemComponent.GetType();
                var typeName = TypeName(elemType);
                _listenerTypeMap.TryGetValue(elemType, out var listenerType);
                declareList.Add(FormatDeclareBlock(bindElement.ElemName, typeName));
                eventList.Add(FormatBindBlock(bindElement.ElemName, typeName, listenerType));
            }
            
            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplatePanelBinder.ts.txt");

            return ta.text.Replace("#TemplatePanel#", className)
                .Replace("#declare#", string.Join("", declareList))
                .Replace("#event#", string.Join("", eventList));
        }

        private string FormatDeclareBlock(string compName, string typeName)
        {
            return string.Format(@"
    private _{0}: {1} 
    public get {0}(): {1} {{ 
        return this._{0}
    }}
    ", compName, typeName);
        }

        private string FormatBindBlock(string compName, string typeName, string listenerType = null)
        {
            string strListener = null;
            if (!string.IsNullOrEmpty(listenerType))
            {
                strListener = string.Format("this.{1}(this._{0})", compName, listenerType);
            }

            return string.Format(@"
        this._{0} = this.GetBindComponent('{0}') as {1};
        {2}
        ", compName, typeName, strListener);
        }
    }
}