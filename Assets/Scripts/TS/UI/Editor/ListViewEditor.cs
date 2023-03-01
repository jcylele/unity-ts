using TS.UI;
using UnityEditor;

namespace TS.Editor
{
    [CustomEditor(typeof(ListView), true)]
    public class ListViewEditor : UnityEditor.Editor
    {
        private ListView mListView;
        private SerializedProperty mChildTemplateFieProperty;
        private SerializedProperty mIsTemplatePrefabProperty;

        void OnEnable()
        {
            mListView = (ListView)target;
            mChildTemplateFieProperty = serializedObject.FindProperty("ChildTemplate");
            mIsTemplatePrefabProperty = serializedObject.FindProperty("IsTemplatePrefab");
        }

        public override void OnInspectorGUI()
        {
            serializedObject.Update();
            EditorGUI.BeginChangeCheck();
            EditorGUILayout.PropertyField(mChildTemplateFieProperty);
            serializedObject.ApplyModifiedProperties();
            if (EditorGUI.EndChangeCheck())
            {
                OnChildTemplateChanged();
            }

            EditorGUILayout.PropertyField(mIsTemplatePrefabProperty);
        }

        private void OnChildTemplateChanged()
        {
            if (mListView.ChildTemplate == null)
            {
                mListView.IsTemplatePrefab = false;
                return;
            }

            mListView.IsTemplatePrefab = mListView.ChildTemplate.gameObject.scene == default;
        }
    }
}