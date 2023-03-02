using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    public class CustomComponentCreator
    {
        /// <summary>
        /// create a canvas as parent if no canvas present
        /// </summary>
        /// <param name="menuCommand"></param>
        /// <returns></returns>
        private static GameObject GetComponentParent(MenuCommand menuCommand)
        {
            var parent = menuCommand.context as GameObject;
            var hasCanvas = parent != null && parent.GetComponentInParent<Canvas>() != null;
            if (hasCanvas)
            {
                return parent;
            }

            var canvasPrefab =
                AssetDatabase.LoadAssetAtPath<GameObject>($"{Const.CustomComponentFolder}\\Canvas.prefab");
            var canvasGo = Object.Instantiate(canvasPrefab, parent != null ? parent.transform : null);
            canvasGo.name = canvasPrefab.name;
            return canvasGo;
        }

        private static GameObject CreateComponent(MenuCommand menuCommand, string prefabName)
        {
            var parent = GetComponentParent(menuCommand);

            var prefabPath = $"{Const.CustomComponentFolder}\\{prefabName}.prefab";
            var prefab = AssetDatabase.LoadAssetAtPath<GameObject>(prefabPath);
            var go = Object.Instantiate(prefab, parent.transform);
            go.name = prefab.name;
            return go;
        }

        /// <summary>
        /// simple components( Prefab.Name == Type.Name )
        /// </summary>
        /// <typeparam name="T">component type</typeparam>
        /// <param name="menuCommand"></param>
        private static void CreateSimpleComponent<T>(MenuCommand menuCommand)
        {
            var go = CreateComponent(menuCommand, typeof(T).Name);
            Selection.activeGameObject = go;
        }

        /// <summary>
        /// Ts Image
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts Image", false, 0)]
        public static void CreateTsImage(MenuCommand menuCommand)
        {
            CreateSimpleComponent<TsImage>(menuCommand);
        }

        /// <summary>
        /// Ts Raw Image
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts Raw Image", false, 1)]
        public static void CreateTsRawImage(MenuCommand menuCommand)
        {
            CreateSimpleComponent<TsRawImage>(menuCommand);
        }

        /// <summary>
        /// ScrollView Horizontal Direction
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts ScrollView (Horizontal)", false, 2)]
        public static void CreateTsScrollViewHorizontal(MenuCommand menuCommand)
        {
            var go = CreateComponent(menuCommand, "ScrollViewHorizontal");
            Selection.activeGameObject = go;
        }

        /// <summary>
        /// ScrollView Vertical Direction
        /// </summary>
        /// <param name="menuCommand"></param>
        [MenuItem("GameObject/TS_UI/Ts ScrollView (Vertical)", false, 3)]
        public static void CreateTsScrollViewVertical(MenuCommand menuCommand)
        {
            var go = CreateComponent(menuCommand, "ScrollViewVertical");
            Selection.activeGameObject = go;
        }
    }
}