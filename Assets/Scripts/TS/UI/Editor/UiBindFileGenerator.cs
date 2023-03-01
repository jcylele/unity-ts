using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using UnityEngine;
using UnityEngine.UI;
using TS.UI;
using UnityEditor;

namespace TS.Editor
{
    public class UiBindFileGenerator
    {
        private static readonly Dictionary<System.Type, string> _listenerTypeMap
            = new Dictionary<System.Type, string>()
            {
                { typeof(Button), "AddClickListener" },
                { typeof(Slider), "AddSlideListener" },
            };

        private static readonly Dictionary<string, string> _typeNameMap
            = new Dictionary<string, string>()
            {
                { "UnityEngine.UI", "CS_UI" },
                { "TS.UI", "TS_UI" }
            };

        public void GenerateTsPanelFiles(UiBindRoot bindRoot)
        {
            var panelFileName = $"{bindRoot.NodeName}.ts";
            var panelPath = Path.Combine(Const.TsPanelFolder, panelFileName);
            //Generate if file not exists
            if (!File.Exists(panelPath))
            {
                var panelContent = GeneratePanelFileContent(bindRoot);
                File.WriteAllText(panelPath, panelContent);
                Debug.Log($"{panelPath} generated");
            }

            //Always Generate binder file
            var binderFileName = $"{bindRoot.NodeName}Binder.ts";
            var binderPath = Path.Combine(Const.TsBinderFolder, binderFileName);

            var binderContent = GenerateBinderFileContent(bindRoot);
            File.WriteAllText(binderPath, binderContent);
            Debug.Log($"{binderPath} generated");
        }

        private void CollectListenerInfos(UiBindNode bindNode,
            ICollection<string> addListenerList,
            ICollection<string> onClickList,
            ICollection<string> onSliderList,
            string prefix = "")
        {
            foreach (var element in bindNode.BindElements)
            {
                switch (element.ElemComponent)
                {
                    case UiBindNode childNode:
                        CollectListenerInfos(childNode, addListenerList, onClickList, onSliderList,
                            $"{prefix}{childNode.NodeName}.");
                        break;
                    case Button _:

                        addListenerList.Add($"this.AddClickListener(this.binder.{prefix}{element.ElemName})");
                        onClickList.Add($@"if (btn === this.binder.{prefix}{element.ElemName}) {{

        }}");
                        break;
                    case Slider _:
                        addListenerList.Add($"this.AddSlideListener(this.binder.{prefix}{element.ElemName})");
                        onSliderList.Add($@"if (slider === this.binder.{prefix}{element.ElemName}) {{

        }}");
                        break;
                    default:
                        break;
                }
            }
        }

        private string GeneratePanelFileContent(UiBindRoot bindRoot)
        {
            var addListenerList = new List<string>();
            var onClickList = new List<string>();
            var onSliderList = new List<string>();
            CollectListenerInfos(bindRoot, addListenerList, onClickList, onSliderList);

            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplatePanel.ts.txt");

            return ta.text
                .Replace("#PanelName#", bindRoot.NodeName)
                .Replace("#AddListener#", string.Join("\r\n\t\t", addListenerList))
                .Replace("#OnClick#", string.Join(" else ", onClickList))
                .Replace("#OnSlider#", string.Join(" else ", onSliderList));
        }

        private string JsTypeName(Component component)
        {
            switch (component)
            {
                case Button button:
                    break;
            }

            return "";
        }

        private string CsTypeName(Component component)
        {
            var type = component.GetType();
            //shortcuts for usual namespaces
            if (_typeNameMap.TryGetValue(type.Namespace, out var alias))
            {
                return $"{alias}.{type.Name}";
            }

            //in ts, all C# namespaces are under CS namespace
            Debug.LogWarning($"Unexpected type in ts panels");
            return $"CS.{type.FullName}";
        }

        private string GenerateBinderFileContent(UiBindRoot bindRoot)
        {
            var clsNames = new List<string>();
            var clsContents = new Dictionary<string, string>();
            FormatBinderClassBlock(bindRoot, clsNames, clsContents);

            StringBuilder sb = new StringBuilder();

            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplateBinderHeader.ts.txt");
            sb.Append(ta.text);
            sb.Append("\r\n");

            foreach (var clsName in clsNames)
            {
                sb.Append(clsContents[clsName]);
                sb.Append("\r\n");
            }

            return sb.ToString();
        }

        private void FormatBinderClassBlock(UiBindNode bindNode, IList<string> clsNames, Dictionary<string, string> clsContents)
        {
            if (clsNames.Contains(bindNode.NodeName))
            {
                throw new Exception($"Duplicate NodeName {bindNode.NodeName}");
            }
            clsNames.Add(bindNode.NodeName);

            var declareList = new List<string>(bindNode.BindElements.Count);
            var bindList = new List<string>(bindNode.BindElements.Count);
            foreach (var element in bindNode.BindElements)
            {
                switch (element.ElemComponent)
                {
                    case UiBindNode childNode:
                    {
                        var jsTypeName = $"{childNode.NodeName}NodeBinder";
                        var jsCtor = $"new {jsTypeName}()";
                        var csTypeName = CsTypeName(element.ElemComponent);

                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));
                        FormatBinderClassBlock(childNode, clsNames, clsContents);
                    }
                        break;
                    case BaseListView listView:
                    {
                        var templateTypeName = $"{listView.ChildTemplate.NodeName}NodeBinder";
                        var jsTypeName = $"ListView<{templateTypeName}>";
                        var jsCtor = $"new {jsTypeName}({templateTypeName})";
                        var csTypeName = CsTypeName(element.ElemComponent);

                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));
                        FormatBinderClassBlock(listView.ChildTemplate, clsNames, clsContents);
                    }
                        break;
                    default:
                    {
                        var csTypeName = CsTypeName(element.ElemComponent);
                        declareList.Add(FormatDeclareStatement(element.ElemName, csTypeName));
                        bindList.Add(FormatBindBasicStatement(element.ElemName, csTypeName));
                    }
                        break;
                }
            }


            var postfix = bindNode is UiBindRoot ? "Binder" : "NodeBinder";
            var superClass = bindNode is UiBindRoot ? "BasePanelBinder" : "BaseNodeBinder";
            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplateBinderClass.ts.txt");
            var result = ta.text
                .Replace("#NodeName#", bindNode.NodeName)
                .Replace("#Postfix#", postfix)
                .Replace("#SuperClass#", superClass)
                .Replace("#declare#", string.Join("", declareList))
                .Replace("#bind#", string.Join("", bindList));
            clsContents.Add(bindNode.NodeName, result);
        }

        private string FormatDeclareStatement(string compName, string jsTypeName)
        {
            return string.Format(@"
    private _{0}: {1} 
    public get {0}(): {1} {{ 
        return this._{0}
    }}
    ", compName, jsTypeName);
        }

        private string FormatBindBasicStatement(string compName, string csTypeName)
        {
            return string.Format(@"
        this._{0} = this.GetBindComponent('{0}') as {1}
        ", compName, csTypeName);
        }

        private string FormatBindAdvancedStatement(string compName, string jsCtor, string csTypeName)
        {
            return string.Format(@"
        this._{0} = {1}
        const cs_{0} = this.GetBindComponent('{0}') as {2}
        this._{0}.Bind(cs_{0})
        ", compName, jsCtor, csTypeName);
        }
    }
}