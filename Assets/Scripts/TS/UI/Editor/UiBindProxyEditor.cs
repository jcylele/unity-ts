using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    [CustomEditor(typeof(UiBindProxy))]
    public class UiBindProxyEditor : UnityEditor.Editor
    {
        private UiBindProxy uiBindProxy;

        private GUIStyle redFontStyle;

        void OnEnable()
        {
            redFontStyle = new GUIStyle
            {
                fontSize = 24
            };
            redFontStyle.normal.textColor = Color.red;

            uiBindProxy = (UiBindProxy)target;
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            if (uiBindProxy.NodePrefab != null)
            {
                if (!uiBindProxy.NodePrefab.gameObject.IsInPrefab())
                {
                    GUILayout.Label("NodePrefab is not an prefab asset!", redFontStyle);
                }
                if (GUILayout.Button("Reset Size", EditorConst.BtnHeight))
                {
                    var prefabRect = uiBindProxy.NodePrefab.GetComponent<RectTransform>().rect;

                    var thisRt = uiBindProxy.GetComponent<RectTransform>();
                    thisRt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, prefabRect.width);
                    thisRt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, prefabRect.height);
                }
                if (uiBindProxy.transform.childCount > 0)
                {
                    if (GUILayout.Button("Unload Prefab", EditorConst.BtnHeight))
                    {
                        for (int i = uiBindProxy.transform.childCount - 1; i >= 0; i--)
                        {
                            DestroyImmediate(uiBindProxy.transform.GetChild(i).gameObject);
                        }
                    }
                }
                else
                {
                    if (GUILayout.Button("Load Prefab", EditorConst.BtnHeight))
                    {
                        var bindNode = Instantiate(uiBindProxy.NodePrefab, uiBindProxy.transform);
                        bindNode.gameObject.hideFlags = HideFlags.HideAndDontSave;
                        bindNode.GetComponent<RectTransform>().FillParent();
                    }
                }
            }
        }
    }
}
