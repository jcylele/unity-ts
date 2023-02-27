using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;
using UnityEngine.UI;

namespace TS.UI
{
    public class UiBindFileGenerator
    {
        private string mPanelTemplateContent = null;
        private string mBinderTemplateContent = null;

        private static readonly string PanelFileTemplatePath =
            Application.dataPath + "\\Scripts\\TS\\UI\\Editor\\TemplatePanel.ts.txt";

        private static readonly string BinderFileTemplatePath =
            Application.dataPath + "\\Scripts\\TS\\UI\\Editor\\TemplatePanelBinder.ts.txt";

        private static readonly string PanelFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\Panels";

        private static readonly string BinderFolder =
            Application.dataPath + "\\..\\TsProj\\src\\UI\\PanelBinders";


        private string PanelTemplateContent
        {
            get { return mPanelTemplateContent ??= File.ReadAllText(PanelFileTemplatePath); }
        }

        private string BinderTemplateContent
        {
            get { return mBinderTemplateContent ??= File.ReadAllText(BinderFileTemplatePath); }
        }

        public void OnSaveUiBindRoot(UiBindRoot bindRoot)
        {
            var panelFileName = $"{bindRoot.NodeName}.ts";
            var panelPath = Path.Combine(PanelFolder, panelFileName);
            //DO NOT OverWrite
            if (!File.Exists(panelPath))
            {
                var panelContent = GeneratePanelFileContent(bindRoot);
                File.WriteAllText(panelPath, panelContent);
                Debug.Log($"{panelPath} generated");
            }

            var binderFileName = $"{bindRoot.NodeName}Binder.ts";
            var binderPath = Path.Combine(BinderFolder, binderFileName);
            //Always Generate
            var binderContent = GenerateBinderFileContent(bindRoot);
            File.WriteAllText(binderPath, binderContent);
            Debug.Log($"{binderPath} generated");
        }

        private string GeneratePanelFileContent(UiBindRoot bindRoot)
        {
            return PanelTemplateContent.Replace("#TemplatePanel#", bindRoot.NodeName);
        }

        private static Dictionary<System.Type, string> _listenerTypeMap = new
            Dictionary<System.Type, string>()
            {
                { typeof(Button), "AddClickListener" },
                { typeof(Slider), "AddSlideListener" },
            };

        private string GenerateBinderFileContent(UiBindRoot bindRoot)
        {
            var className = $"{bindRoot.NodeName}Binder";
            var declareList = new List<string>(bindRoot.BindElements.Count);
            var eventList = new List<string>(bindRoot.BindElements.Count);
            foreach (var bindElement in bindRoot.BindElements)
            {
                var elemType = bindElement.ElemComponent.GetType();
                declareList.Add(FormatDeclareBlock(bindElement.ElemName, elemType.Name));
                _listenerTypeMap.TryGetValue(elemType, out var listenerType);
                eventList.Add(FormatBindBlock(bindElement.ElemName, elemType.Name, listenerType));
            }

            return BinderTemplateContent.Replace("#TemplatePanel#", className)
                .Replace("#declare#", string.Join("", declareList))
                .Replace("#event#", string.Join("", eventList));
        }

        private string FormatDeclareBlock(string compName, string compType)
        {
            return string.Format(@"
    private _{0}: CS_UI.{1} 
    public get {0}(): CS_UI.{1} {{ 
        return this._{0}
    }}
    ", compName, compType);
        }

        private string FormatBindBlock(string compName, string compType, string listenerType = null)
        {
            string strListener = null;
            if (!string.IsNullOrEmpty(listenerType))
            {
                strListener = string.Format("this.{1}(this._{0})", compName, listenerType);
            }

            return string.Format(@"
        this._{0} = this.GetBindComponent('{0}') as CS_UI.{1};
        {2}
        ", compName, compType, strListener);
        }
    }
}