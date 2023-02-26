using System.Collections.Generic;
using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS
{
    [InitializeOnLoad]
    public class SceneModificationProcessor
    {
        static SceneModificationProcessor()
        {
            UnityEditor.SceneManagement.EditorSceneManager.sceneSaving += OnSavingScene;
        }

        private static void OnSavingScene(UnityEngine.SceneManagement.Scene scene, string path)
        {
            // Debug.Log($"OnSavingScene: {path}");
            var allUiBindRoots = new List<UiBindNode>();
            var rootGameObjects = scene.GetRootGameObjects();
            foreach (var o in rootGameObjects)
            {
                allUiBindRoots.AddRange(o.GetComponentsInChildren<UiBindNode>(true));
            }

            if (allUiBindRoots.Count > 0)
            {
                new UiBindFileGenerator().ProcessUiBindRoots(allUiBindRoots);
            }
        }
    }
}