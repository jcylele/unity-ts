using System.Collections.Generic;
using TS.UI;
using UnityEngine.UI;

namespace TS.Editor
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

        private readonly UiBindNode mBindNode;

        public PanelFileGenerator(UiBindRoot bindRoot)
        {
            mBindNode = bindRoot;
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
                    case BaseListView listView:
                        var itemName = listView.ChildTemplate.NodeName;
                        onInitFillItemList.Add(
                            $"this.binder.{prefix}{element.ElemName}.SetFuncFillItem(this.fill_{itemName}.bind(this))");
                        onShowList.Add($"this.binder.{prefix}{element.ElemName}.Refresh(0)");

                        fillItemBlockList.Add($@"private fill_{itemName}(item: {itemName}NodeBinder, index: number){{
        
    }}");
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
            this.CollectListenerInfos(mBindNode);

            var fileFormatter = new FileContentFormatter($"{Const.FileTemplateFolder}\\TemplatePanel.ts.txt")
                .AddSingleReplacer("#PanelName#", mBindNode.NodeName)
                .AddListReplacer("#AddListener#", onInitListenerList, "\r\n\t\t")
                .AddListReplacer("#FillItemFunc#", onInitFillItemList, "\r\n\t\t")
                .AddListReplacer("#OnShow#", onShowList, "\r\n\t\t")
                .AddListReplacer("#FillItemBlock#", fillItemBlockList, "\r\n\t")
                .AddListReplacer("#OnClick#", onClickList, " else ")
                .AddListReplacer("#OnSlider#", onSliderList, " else ");

            var result = fileFormatter.FormatContent();
            Clear();
            return result;
        }
    }
}