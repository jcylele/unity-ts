using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TS.Editor;
using TS.UI.Components;
using UnityEditor;

namespace TS.UI.Editor.FileGenerator
{
    internal class BinderFileGenerator
    {
        private readonly List<string> clsNames = new List<string>();
        private readonly Dictionary<string, string> clsContents = new Dictionary<string, string>();
        private readonly Dictionary<string, string> importWidgets = new Dictionary<string, string>();
        private readonly UiBindNode mBindNode;

        public BinderFileGenerator(UiBindNode bindNode)
        {
            mBindNode = bindNode;
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

        private string FormatBindAdvancedStatement(string compName, string jsCtor, string csTypeName,
            string csPropName = "")
        {
            if (!string.IsNullOrEmpty(csPropName))
            {
                csPropName = $".{csPropName}";
            }

            return string.Format(@"
        this._{0} = {1}
        const cs_{0} = this.GetBindComponent('{0}') as {2}
        this._{0}.Bind(cs_{0}{3})
        ", compName, jsCtor, csTypeName, csPropName);
        }

        private string FormatClassDefineStatement(UiBindNode bindNode)
        {
            var className = TsFileGenerateRoot.JsTypeName(bindNode);
            var superClass = TsFileGenerateRoot.JsSuperName(bindNode);
            return $"{className} extends {superClass}";
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

        private void FormatBinderClassBlock(UiBindNode bindNode)
        {
            if (clsNames.Contains(bindNode.NodeName))
            {
                throw new Exception($"Duplicate NodeName {bindNode.NodeName}");
            }

            clsNames.Add(bindNode.NodeName);
            //import parent class
            AddImport(TsFileGenerateRoot.JsSuperName(bindNode), EditorConst.UI_FOLDER_BASE);

            var declareList = new List<string>(bindNode.BindElements.Count);
            var bindList = new List<string>(bindNode.BindElements.Count);
            foreach (var element in bindNode.BindElements)
            {
                switch (element.ElemComponent)
                {
                    case UiBindNode childNode:
                    {
                        var jsTypeName = TsFileGenerateRoot.JsTypeName(childNode);
                        var jsCtor = $"new {jsTypeName}()";
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);

                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));
                        //inner widget class
                        FormatBinderClassBlock(childNode);
                    }
                        break;
                    case UiBindProxy bindProxy:
                    {
                        if (bindProxy.NodePrefab == null)
                        {
                            Selection.activeObject = bindProxy;
                            throw new NullReferenceException($"NodePrefab of {bindProxy.name} is null");
                        }

                        var jsTypeName = TsFileGenerateRoot.JsTypeName(bindProxy.NodePrefab);
                        var jsCtor = $"new {jsTypeName}()";
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);
                        //import outer widget class
                        AddImport(jsTypeName, EditorConst.UI_FOLDER_WIDGET);
                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName, "Node"));
                    }
                        break;
                    case BaseListView listView:
                    {
                        if (listView.NodeProvider == null)
                        {
                            Selection.activeObject = listView;
                            throw new NullReferenceException($"ChildTemplate of {listView.name} is null");
                        }

                        var itemNode = listView.NodeProvider.Prefab;
                        var templateTypeName = TsFileGenerateRoot.JsTypeName(itemNode);
                        var jsType = listView.ItemSelectable ? "ListViewSelectable" : "ListView";
                        var jsTypeName = $"{jsType}<{templateTypeName}>";

                        var jsCtor = $"new {jsTypeName}({templateTypeName})";
                        var csTypeName = TsFileGenerateRoot.CsTypeName(element.ElemComponent);

                        AddImport(jsType, EditorConst.UI_FOLDER_COMPONENT);
                        declareList.Add(FormatDeclareStatement(element.ElemName, jsTypeName));
                        bindList.Add(FormatBindAdvancedStatement(element.ElemName, jsCtor, csTypeName));

                        if (listView.NodeProvider is UiBindNode)
                        {
                            //inner widget class
                            FormatBinderClassBlock(itemNode);
                        }
                        else if (listView.NodeProvider is UiBindProxy)
                        {
                            //import outer widget class
                            AddImport(templateTypeName, EditorConst.UI_FOLDER_WIDGET);
                        }
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

            var fileFormatter =
                new FileContentFormatter($"{EditorConst.FileTemplateFolder}\\TemplateBinderClass.ts.txt")
                    .AddSingleReplacer("#class_define#", FormatClassDefineStatement(bindNode))
                    .AddListReplacer("#declare#", declareList)
                    .AddListReplacer("#bind#", bindList);

            clsContents.Add(bindNode.NodeName, fileFormatter.FormatContent());
        }

        public string GenerateContent()
        {
            FormatBinderClassBlock(mBindNode);

            var sb = new StringBuilder();

            var headerFormatter =
                new FileContentFormatter($"{EditorConst.FileTemplateFolder}\\TemplateBinderHeader.ts.txt")
                    .AddListReplacer("#import#", importWidgets.Values.ToList(),"\r\n");

            sb.Append(headerFormatter.FormatContent());
            sb.Append("\r\n");

            foreach (var clsName in clsNames)
            {
                sb.Append(clsContents[clsName]);
                sb.Append("\r\n");
            }

            clsNames.Clear();
            clsContents.Clear();
            importWidgets.Clear();

            return sb.ToString();
        }
    }
}