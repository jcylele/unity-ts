using UnityEditor;
using UnityEngine;

namespace TS
{
    [CustomEditor(typeof(JsManager))]
    public class JsManagerEditor : Editor
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