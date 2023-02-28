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


        private string TypeName(System.Type type)
        {
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
            var nested = new List<string>();
            FormatBinderClassBlock(bindRoot, nested);

            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplateBinderHeader.ts.txt");
            nested.Add(ta.text);

            nested.Reverse();

            return string.Join("", nested);
        }

        private void FormatBinderClassBlock(UiBindNode bindNode, ICollection<string> nestedClasses)
        {
            var declareList = new List<string>(bindNode.BindElements.Count);
            var bindList = new List<string>(bindNode.BindElements.Count);
            foreach (var element in bindNode.BindElements)
            {
                if (element.ElemComponent is UiBindNode childNode)
                {
                    var typeName = $"{childNode.NodeName}NodeBinder";
                    declareList.Add(FormatDeclareStatement(element.ElemName, typeName));
                    bindList.Add(FormatBindNodeStatement(element.ElemName, typeName));
                    FormatBinderClassBlock(childNode, nestedClasses);
                }
                else
                {
                    var elemType = element.ElemComponent.GetType();
                    var typeName = TypeName(elemType);
                    declareList.Add(FormatDeclareStatement(element.ElemName, typeName));
                    bindList.Add(FormatBindStatement(element.ElemName, typeName));
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
            nestedClasses.Add(result);
        }

        private string FormatDeclareStatement(string compName, string typeName)
        {
            return string.Format(@"
    private _{0}: {1} 
    public get {0}(): {1} {{ 
        return this._{0}
    }}
    ", compName, typeName);
        }

        private string FormatBindStatement(string compName, string typeName)
        {
            return string.Format(@"
        this._{0} = this.GetBindComponent('{0}') as {1};
        ", compName, typeName);
        }

        private string FormatBindNodeStatement(string compName, string clsName)
        {
            return string.Format(@"
        this._{0} = new {1}()
        const _{0}Node = this.GetBindComponent('{0}') as TS_UI.UiBindNode;
        this._{0}.Bind(_{0}Node)
        ", compName, clsName);
        }
    }
}