using System;
using System.Collections.Generic;
using System.Text;
using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    internal class PanelBinderFileGenerator
    {
        private readonly List<string> clsNames = new List<string>();
        private readonly Dictionary<string, string> clsContents = new Dictionary<string, string>();

        private readonly UiBindNode mBindNode;

        public PanelBinderFileGenerator(UiBindRoot bindRoot)
        {
            mBindNode = bindRoot;
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

        private void FormatBinderClassBlock(UiBindNode bindNode)
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
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);

                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));
                        FormatBinderClassBlock(childNode);
                    }
                        break;
                    case BaseListView listView:
                    {
                        if (listView.ChildTemplate == null)
                        {
                            Selection.activeObject = listView;
                            throw new NullReferenceException($"ChildTemplate of {listView.name} is null");
                        }

                        var templateTypeName = $"{listView.ChildTemplate.NodeName}NodeBinder";
                        var jsTypeName = $"ListView<{templateTypeName}>";
                        var jsCtor = $"new {jsTypeName}({templateTypeName})";
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);

                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));
                        FormatBinderClassBlock(listView.ChildTemplate);
                    }
                        break;
                    default:
                    {
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);
                        declareList.Add(FormatDeclareStatement(element.ElemName, csTypeName));
                        bindList.Add(FormatBindBasicStatement(element.ElemName, csTypeName));
                    }
                        break;
                }
            }


            var postfix = bindNode is UiBindRoot ? "Binder" : "NodeBinder";
            var superClass = bindNode is UiBindRoot ? "BasePanelBinder" : "BaseNodeBinder";

            var fileFormatter = new FileContentFormatter($"{Const.FileTemplateFolder}\\TemplateBinderClass.ts.txt")
                .AddSingleReplacer("#NodeName#", bindNode.NodeName)
                .AddSingleReplacer("#Postfix#", postfix)
                .AddSingleReplacer("#SuperClass#", superClass)
                .AddListReplacer("#declare#", declareList)
                .AddListReplacer("#bind#", bindList);

            clsContents.Add(bindNode.NodeName, fileFormatter.FormatContent());
        }


        public string GenerateContent()
        {
            FormatBinderClassBlock(mBindNode);

            var sb = new StringBuilder();

            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(
                $"{Const.FileTemplateFolder}\\TemplateBinderHeader.ts.txt");
            sb.Append(ta.text);
            sb.Append("\r\n");

            foreach (var clsName in clsNames)
            {
                sb.Append(clsContents[clsName]);
                sb.Append("\r\n");
            }

            clsNames.Clear();
            clsContents.Clear();

            return sb.ToString();
        }
    }
}