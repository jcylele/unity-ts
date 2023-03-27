using System.Collections.Generic;
using System.Linq;
using TS.UI.Components;
using UnityEngine.UI;

namespace TS.UI.Editor.FileGenerator
{
    /// <summary>
    /// Generate Typescript Panel files, such as XXXPanel.ts
    /// </summary>
    internal class PanelFileGenerator
    {
        private readonly List<string> onInitListenerList = new List<string>();
        private readonly List<string> onInitFillItemList = new List<string>();
        private readonly List<string> fillItemBlockList = new List<string>();
        private readonly List<string> onShowList = new List<string>();
        private readonly List<string> onClickList = new List<string>();
        private readonly List<string> onSliderList = new List<string>();
        private readonly Dictionary<string, string> importWidgets = new Dictionary<string, string>();
        private readonly HashSet<string> importInnerWidgets = new HashSet<string>();

        private readonly UiBindNode mBindNode;

        public PanelFileGenerator(UiBindRoot bindRoot)
        {
            mBindNode = bindRoot;
        }

        private string FormatImportStatement(string clsName, string folder)
        {
            return $@"import {{{clsName}}} from ""../{folder}/{clsName}"";";
        }

        private void AddImport(string jsTypeName, string folder)
        {
            if (!importWidgets.ContainsKey(jsTypeName))
            {
                importWidgets.Add(jsTypeName, FormatImportStatement(jsTypeName, folder));
            }
        }

        private void CollectListenerInfos(UiBindNode bindNode, string prefix = "")
        {
            foreach (var element in bindNode.BindElements)
            {
                switch (element.ElemComponent)
                {
                    case UiBindNode childNode:
                        CollectListenerInfos(childNode, $"{prefix}{childNode.NodeName}.");
                        break;
                    case BaseContainerView listView:
                        var itemNode = listView.NodeProvider.Prefab;
                        onInitFillItemList.Add(
                            $"this.binder.{prefix}{element.ElemName}.SetFuncFillItem(this.fill_{itemNode.NodeName}.bind(this))");
                        onShowList.Add($"this.binder.{prefix}{element.ElemName}.SetItemCount(0)");

                        fillItemBlockList.Add(
                            $@"private fill_{itemNode.NodeName}(item: {TsFileGenerateRoot.JsTypeName(itemNode)}, index: number){{
        
    }}");
                        var templateTypeName = TsFileGenerateRoot.JsTypeName(itemNode);
                        if (listView.NodeProvider is UiBindNode)
                        {
                            //import inner widget class
                            importInnerWidgets.Add(templateTypeName);
                        }
                        else if (listView.NodeProvider is UiBindProxy)
                        {
                            //import outer widget class
                            AddImport(templateTypeName, EditorConst.UI_FOLDER_WIDGET);
                        }

                        break;
                    case Button _:

                        onInitListenerList.Add($"this.AddClickListener(this.binder.{prefix}{element.ElemName})");
                        onClickList.Add($@"if (btn === this.binder.{prefix}{element.ElemName}) {{

        }}");
                        break;
                    case Slider _:
                        onInitListenerList.Add($"this.AddSlideListener(this.binder.{prefix}{element.ElemName})");
                        onSliderList.Add($@"if (slider === this.binder.{prefix}{element.ElemName}) {{

        }}");
                        break;
                    default:
                        break;
                }
            }
        }

        private void Clear()
        {
            onInitListenerList.Clear();
            onInitFillItemList.Clear();
            fillItemBlockList.Clear();
            onShowList.Clear();
            onClickList.Clear();
            onSliderList.Clear();
        }

        public string GenerateContent()
        {
            importInnerWidgets.Add($"{mBindNode.NodeName}Binder");
            this.CollectListenerInfos(mBindNode);

            var fileFormatter = new FileContentFormatter($"{EditorConst.FileTemplateFolder}\\TemplatePanel.ts.txt")
                .AddSingleReplacer("#PanelName#", mBindNode.NodeName)
                .AddListReplacer("#AddListener#", onInitListenerList, "\r\n\t\t")
                .AddListReplacer("#FillItemFunc#", onInitFillItemList, "\r\n\t\t")
                .AddListReplacer("#OnShow#", onShowList, "\r\n\t\t")
                .AddListReplacer("#FillItemBlock#", fillItemBlockList, "\r\n\t")
                .AddListReplacer("#OnClick#", onClickList, " else ")
                .AddListReplacer("#OnSlider#", onSliderList, " else ")
                .AddListReplacer("#InnerImport#", importInnerWidgets.ToList(), ", ")
                .AddListReplacer("#Import#", importWidgets.Values.ToList(), "\r\n");

            var result = fileFormatter.FormatContent();
            Clear();
            return result;
        }
    }
}