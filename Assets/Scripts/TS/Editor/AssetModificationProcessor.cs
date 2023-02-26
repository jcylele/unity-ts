using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS
{
    public class AssetModificationProcessor : UnityEditor.AssetModificationProcessor
    {
        /// <summary>
        /// triggered when saving assets
        /// </summary>
        /// <param name="paths">path of assets</param>
        /// <returns>path of filtered assets</returns>
        static string[] OnWillSaveAssets(string[] paths)
        {
            // Debug.Log("OnWillSaveAssets");
            foreach (string path in paths)
            {
                Debug.Log(path);
                ProcessPrefab(path);
            }

            return paths;
        }

        private static void ProcessPrefab(string path)
        {
            GameObject prefab = AssetDatabase.LoadAssetAtPath<GameObject>(path);
            // check only prefabs
            if (!prefab)
                return;
            var rootList = prefab.GetComponentsInChildren<UiBindNode>(true);
            if (rootList.Length > 0)
            {
                new UiBindFileGenerator().ProcessUiBindRoots(rootList);
            }
        }
    }
}