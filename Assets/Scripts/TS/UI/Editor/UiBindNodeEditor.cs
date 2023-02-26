using UnityEditor;
using UnityEngine;

namespace TS.UI
{
    [CustomEditor(typeof(UiBindNode), true)]
    public class UiBindNodeEditor : Editor
    {
        private UiBindNode mBindRoot;

        void OnEnable()
        {
            mBindRoot = (UiBindNode)target;
            if (string.IsNullOrEmpty(mBindRoot.NodeName))
            {
                mBindRoot.NodeName = mBindRoot.name;
                EditorUtility.SetDirty(mBindRoot);
            }
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();
            if (GUILayout.Button("Refresh Names"))
            {
                foreach (var bindElement in mBindRoot.BindElements)
                {
                    bindElement.ElemName = bindElement.ElemComponent.name;
                }

                Debug.Log("All names Restored");
                EditorUtility.SetDirty(mBindRoot);
            }
        }

        [MenuItem("CONTEXT/Component/---Add To UI Bind Node---")]
        private static void AddToParentrUIBindNode(MenuCommand command)
        {
            var component = command.context as Component;

            var parent = component.transform;
            //UiBindRoot can be added to higher UiBindRoot
            if (component is UiBindNode)
            {
                parent = parent.parent;
            }

            var bindRoot = parent.GetComponentInParent<UiBindNode>();
            if (bindRoot == null)
            {
                Debug.LogError($"No UiBindNode found in parent hierarchy");
                return;
            }

            if (bindRoot.AddUiBindElement(component.name, component))
            {
                Debug.Log($"Add {component} To {bindRoot} Succeed");
                EditorUtility.SetDirty(bindRoot);
            }
            else
            {
                Debug.LogError($"Add {component} To {bindRoot} Failed, Check the name or component!");
            }
        }
    }
}