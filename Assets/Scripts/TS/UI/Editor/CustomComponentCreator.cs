using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    public class CustomComponentCreator
    {
        private static void CreateComponent<T>(MenuCommand menuCommand) where T : Component
        {
            var compTypeName = typeof(T).Name;
            var parent = menuCommand.context as GameObject;
            var withCanvas = parent == null || parent.GetComponentInParent<Canvas>() == null;

            var prefabPath = withCanvas
                ? $"{Const.CustomComponentFolder}\\{compTypeName}WithCanvas.prefab"
                : $"{Const.CustomComponentFolder}\\{compTypeName}WithoutCanvas.prefab";

            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(prefabPath);
            var go = Object.Instantiate(prefab, parent != null ? parent.transform : null);

            if (withCanvas)
            {
                go.name = "Canvas";
                Selection.activeGameObject = go.GetComponentInChildren<T>().gameObject;
            }
            else
            {
                go.name = compTypeName;
                Selection.activeGameObject = go;
            }
        }

        /// <summary>
        /// add a menu item(TS_UI/Ts Image) in the right click menu in hierarchy
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts Image", false, 0)]
        public static void CreateTsImage(MenuCommand menuCommand)
        {
            CreateComponent<TsImage>(menuCommand);
        }

        /// <summary>
        /// add a menu item(TS_UI/Ts Raw Image) in the right click menu in hierarchy
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts Raw Image", false, 1)]
        public static void CreateTsRawImage(MenuCommand menuCommand)
        {
            CreateComponent<TsRawImage>(menuCommand);
        }
    }
}