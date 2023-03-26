using TS.UI;
using TS.UI.Editor;
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
                Debug.Log($"SAVE: {path}");
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

        private static AssetDeleteResult OnWillDeleteAsset(string path, RemoveAssetOptions options)
        {

            //"Assets/Resources/UI/Prefabs/Widgets/New Material.mat"
            Debug.Log($"DELETE: {path}");

            //let unity delete the asset
            return AssetDeleteResult.DidNotDelete;
        }

        private static AssetMoveResult OnWillMoveAsset(string sourcePath, string destinationPath)
        {
            Debug.Log($"MOVE: {sourcePath} -> {destinationPath}");
            AssetMoveResult assetMoveResult = AssetMoveResult.DidNotMove;

            // Perform operations on the asset and set the value of 'assetMoveResult' accordingly.

            return assetMoveResult;
        }
    }
}