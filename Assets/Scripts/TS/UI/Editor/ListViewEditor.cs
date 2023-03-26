using TS.UI.Components;
using UnityEditor;
using UnityEngine;

namespace TS.UI.Editor
{
    [CustomEditor(typeof(ListView))]
    public class ListViewEditor : UnityEditor.Editor
    {
        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();
            GUILayout.Label("Use this with Layout Groups ( and Content Size Fitter )");
        }
    }
}