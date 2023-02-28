using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    [InitializeOnLoad]
    public class SceneModificationProcessor
    {
        static SceneModificationProcessor()
        {
            UnityEditor.SceneManagement.EditorSceneManager.sceneSaving += OnSavingScene;
        }

        /// <summary>
        /// called when saving the active scene
        /// </summary>
        /// <param name="scene">active scene object</param>
        /// <param name="path">scene path</param>
        private static void OnSavingScene(UnityEngine.SceneManagement.Scene scene, string path)
        {
            Debug.Log($"OnSavingScene: {path}");
        }
    }
}