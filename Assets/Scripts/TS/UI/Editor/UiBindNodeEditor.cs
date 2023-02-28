using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    [CustomEditor(typeof(UiBindNode), true)]
    public class UiBindNodeEditor : UnityEditor.Editor
    {
        protected UiBindNode mBindNode;

        void OnEnable()
        {
            mBindNode = (UiBindNode)target;
            if (string.IsNullOrEmpty(mBindNode.NodeName))
            {
                mBindNode.NodeName = mBindNode.name;
                EditorUtility.SetDirty(mBindNode);
            }
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();
            if (GUILayout.Button("Refresh Names"))
            {
                foreach (var bindElement in mBindNode.BindElements)
                {
                    bindElement.ElemName = bindElement.ElemComponent.name;
                }
                mBindNode.NodeName = mBindNode.gameObject.name;

                Debug.Log("All names Restored");
                EditorUtility.SetDirty(mBindNode);
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

    [CustomEditor(typeof(UiBindRoot))]
    public class UiBindRootEditor : UiBindNodeEditor
    {
        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            if (GUILayout.Button("Generate TS Files"))
            {
                new UiBindFileGenerator().GenerateTsPanelFiles(this.mBindNode as UiBindRoot);
            }
        }
    }
}