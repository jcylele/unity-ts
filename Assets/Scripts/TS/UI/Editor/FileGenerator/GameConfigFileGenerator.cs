using System.Collections.Generic;
using System.IO;
using Unity.Plastic.Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

namespace TS.UI.Editor.FileGenerator
{
    public class GameConfigFileGenerator
    {
        private readonly string mJsonPath;
        private readonly List<string> mFieldList = new List<string>();

        public GameConfigFileGenerator(string jsonPath)
        {
            this.mJsonPath = jsonPath;
        }

        public string GenerateContent()
        {
            var configName = Path.GetFileNameWithoutExtension(mJsonPath);

            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(mJsonPath);
            var jObj = JObject.Parse(ta.text);

            // var keyName = jObj.GetValue("key").Value<string>();

            var fieldMap = jObj.GetValue("data_struct");
            var dict = fieldMap.ToObject<Dictionary<string, string>>();

            foreach (var pair in dict)
            {
                mFieldList.Add($@"readonly {pair.Key}: {pair.Value}");
            }

            var fileFormatter = new FileContentFormatter($"{EditorConst.FileTemplateFolder}\\TemplateConfig.ts.txt")
                .AddSingleReplacer("#config_name#", configName)
                .AddListReplacer("#filed_block#", mFieldList,"\r\n\t");

            var result = fileFormatter.FormatContent();
            mFieldList.Clear();
            return result;
        }
    }
}