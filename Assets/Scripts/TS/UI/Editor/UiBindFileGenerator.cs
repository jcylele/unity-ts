using System.Collections.Generic;
using System.IO;
using UnityEditor;
using UnityEngine;

namespace TS.UI
{
    public class UiBindFileGenerator
    {
        private string mTemplateContent = null;

        private string TemplateContent
        {
            get
            {
                if (mTemplateContent == null)
                {
                    mTemplateContent = File.ReadAllText(Application.dataPath + "\\Scripts\\Common\\UiBind\\Editor\\UiBindTemplate.cs.txt");
                }

                return mTemplateContent;
            }
        }

        public void ProcessUiBindRoots(IList<UiBindNode> roots)
        {
            // foreach (var root in roots)
            // {
            //     GenerateUiBindFile(root);
            // }
            // AssetDatabase.Refresh();
        }

        private void GenerateUiBindFile(UiBindNode bindRoot)
        {
            var className = $"{bindRoot.NodeName}UiBindData";
            var lines = new List<string>(bindRoot.BindElements.Count);
            foreach (var bindElement in bindRoot.BindElements)
            {
                lines.Add(FormatBindLine(bindElement.ElemName, bindElement.ElemComponent.GetType().Name));
            }

            var fileContent = TemplateContent;
            fileContent = fileContent.Replace("#TemplateName#", className);
            fileContent = fileContent.Replace("#ControlRegion#", string.Join("", lines));

            var outputFilePath = $"{Application.dataPath}\\Scripts\\_GeneratedCode\\UiBindDatas\\{className}.cs";
            File.WriteAllText(outputFilePath, fileContent);
            Debug.Log($"{className}.cs generated");
        }

        private string FormatBindLine(string compName, string compType)
        {
            return $"\t\tpublic {compType} {compName} => (UiBind[\"{compName}\"]) as {compType};\r\n";
        }
    }
}
