using System.Collections.Generic;
using System.IO;
using System.Linq;
using Unity.Plastic.Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

namespace TS.UI.Editor.FileGenerator
{
    public class GameConfigFileGenerator
    {
        private readonly string mJsonPath;
        private readonly List<string> mFieldList = new List<string>();
        private readonly List<string> mGetFieldList = new List<string>();
        private ItemTypeConfig mItemTypeConfig;

        private static Dictionary<TextType, string> _textTypeMap = new Dictionary<TextType, string>()
        {
            { TextType.Name, "name" },
            { TextType.Desc, "desc" },
        };

        public GameConfigFileGenerator(string jsonPath)
        {
            this.mJsonPath = jsonPath;
            var config =
                AssetDatabase.LoadAssetAtPath<ItemNameDescConfig>(
                    "Assets/Resources/TsConfigs/ItemNameDescConfig.asset");
            if (config != null)
            {
                mItemTypeConfig =
                    config.configs.Find(c => c.configFileName == Path.GetFileNameWithoutExtension(jsonPath));
            }
        }

        private string FormatGetText(string text)
        {
            return $@"
    get {text}(): string {{
        return GetText(`{this.mItemTypeConfig.prefix}_{text}_${{this.data.{this.mItemTypeConfig.fieldName}}}`)
    }}
";
        }

        private string FormatFieldStatement(string fieldName, string fieldType)
        {
            return $@"
    readonly {fieldName}: {fieldType}";
        }

        private string FormatGetFieldStatement(string fieldName, string fieldType)
        {
            return $@"
    get {fieldName}(): {fieldType} {{
        return this.data.{fieldName}
    }}
";
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
                mFieldList.Add(FormatFieldStatement(pair.Key, pair.Value));
                mGetFieldList.Add(FormatGetFieldStatement(pair.Key, pair.Value));
            }

            if (this.mItemTypeConfig != null)
            {
                foreach (var pair in _textTypeMap.Where(pair => this.mItemTypeConfig.textType.HasFlag(pair.Key)))
                {
                    mGetFieldList.Add(FormatGetText(pair.Value));
                }
            }

            var fileFormatter = new FileContentFormatter($"{EditorConst.FileTemplateFolder}\\TemplateConfig.ts.txt")
                .AddSingleReplacer("#config_name#", configName)
                .AddListReplacer("#filed_block#", mFieldList, "\r\n")
                .AddListReplacer("#field_get_block#", mGetFieldList, "\r\n");


            var result = fileFormatter.FormatContent();
            mFieldList.Clear();
            return result;
        }
    }
}