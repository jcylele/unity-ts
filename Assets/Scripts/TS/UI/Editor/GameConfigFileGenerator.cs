using System.Collections.Generic;
using System.IO;
using Unity.Plastic.Newtonsoft.Json.Linq;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
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
            var dict = fieldMap.ToObject<SortedDictionary<string, string>>();

            foreach (var pair in dict)
            {
                mFieldList.Add($@"readonly {pair.Key}: {pair.Value}");
            }

            var fileFormatter = new FileContentFormatter($"{Const.FileTemplateFolder}\\TemplateConfig.ts.txt")
                .AddSingleReplacer("#config_name#", configName)
                .AddListReplacer("#filed_block#", mFieldList, "\r\n\t");

            var result = fileFormatter.FormatContent();
            mFieldList.Clear();
            return result;
        }

        private static void GenerateTsConfigFile(string assetPath)
        {
            var configName = Path.GetFileNameWithoutExtension(assetPath);
            var configPath = $"{Const.TsConfigScriptFolder}\\{configName}.ts";

            var content = new GameConfigFileGenerator(assetPath).GenerateContent();
            File.WriteAllText(configPath, content);
            Debug.Log($"{configPath} generated");
        }

        [MenuItem("Assets/Generate/Ts Config File")]
        private static void GenerateTsConfigFile(MenuCommand menuCommand)
        {
            Debug.Log(menuCommand.context);
            Debug.Log(menuCommand.userData);
            foreach (var guid in Selection.assetGUIDs)
            {
                var assetPath = AssetDatabase.GUIDToAssetPath(guid);
                if (assetPath.EndsWith(".json"))
                {
                    GenerateTsConfigFile(assetPath);
                }
            }
        }
    }
}