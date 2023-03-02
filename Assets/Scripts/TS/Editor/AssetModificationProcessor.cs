using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    public class AssetModificationProcessor : UnityEditor.AssetModificationProcessor
    {
        /// <summary>
        /// triggered when saving assets
        /// TODO at this time, AssetDatabase.LoadAssetAtPath get older version which causes problems
        /// </summary>
        /// <param name="paths">path of assets</param>
        /// <returns>path of filtered assets</returns>
        static string[] OnWillSaveAssets(string[] paths)
        {
            // Debug.Log("OnWillSaveAssets");
            foreach (string path in paths)
            {
                Debug.Log($"OnWillSaveAssets: {path}");
                //TODO Disable for now
                // ProcessPrefab(path);
            }

            return paths;
        }

        private static void ProcessPrefab(string path)
        {
            GameObject prefab = AssetDatabase.LoadAssetAtPath<GameObject>(path);
            // check only prefabs
            if (!prefab)
                return;
            var bindRoot = prefab.GetComponent<UiBindRoot>();
            if (bindRoot != null)
            {
                TsFileGenerateRoot.GenerateTsPanelFiles(bindRoot);
            }
        }
    }
}