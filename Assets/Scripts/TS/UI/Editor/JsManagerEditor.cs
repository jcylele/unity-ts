using UnityEditor;
using UnityEngine;

namespace TS.UI.Editor
{
    [CustomEditor(typeof(JsManager))]
    public class JsManagerEditor : UnityEditor.Editor
    {
        private JsManager mJsManager;

        void OnEnable()
        {
            mJsManager = (JsManager)target;
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();
            if (GUILayout.Button("Test"))
            {
                mJsManager.Test();
            }
        }
    }
}