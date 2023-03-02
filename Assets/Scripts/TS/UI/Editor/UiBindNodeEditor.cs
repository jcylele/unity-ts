using System.Collections.Generic;
using TS.UI;
using UnityEditor;
using UnityEngine;

namespace TS.Editor
{
    [CustomEditor(typeof(UiBindNode), true)]
    public class UiBindNodeEditor : UnityEditor.Editor
    {
        protected UiBindNode mBindNode;

        // protected GUIStyle MyStyle = new GUIStyle
        // {
        //     fontSize = 30
        // };

        protected GUILayoutOption BtnHeight = GUILayout.Height(40);

        void OnEnable()
        {
            mBindNode = (UiBindNode)target;
            if (string.IsNullOrEmpty(mBindNode.NodeName))
            {
                mBindNode.NodeName = mBindNode.name;
                EditorUtility.SetDirty(mBindNode);
            }
        }

        private void ShowClearButton()
        {
            var invalidElements = new List<UiBindElement>();
            foreach (var bindElement in mBindNode.BindElements)
            {
                if (bindElement.ElemComponent == null)
                {
                    invalidElements.Add(bindElement);
                }
            }

            if (invalidElements.Count > 0 && GUILayout.Button("Clear Invalid Elements", BtnHeight))
            {
                foreach (var element in invalidElements)
                {
                    mBindNode.BindElements.Remove(element);
                }

                Debug.Log("All Invalid Elements Cleared");
                EditorUtility.SetDirty(mBindNode);
            }
        }

        private void ShowRenameButton()
        {
            var namedElements = new List<UiBindElement>();
            foreach (var bindElement in mBindNode.BindElements)
            {
                if (bindElement.ElemComponent.name != bindElement.ElemName)
                {
                    namedElements.Add(bindElement);
                }
            }

            if ((namedElements.Count > 0 || mBindNode.NodeName != mBindNode.name) &&
                GUILayout.Button("Refresh Names", BtnHeight))
            {
                foreach (var bindElement in namedElements)
                {
                    bindElement.ElemName = bindElement.ElemComponent.name;
                }

                mBindNode.NodeName = mBindNode.name;

                Debug.Log("All Names Restored");
                EditorUtility.SetDirty(mBindNode);
            }
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            ShowClearButton();
            ShowRenameButton();
        }

        [MenuItem("CONTEXT/Component/---Add To UI Bind Node---")]
        private static void AddToParentUiBindNode(MenuCommand command)
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

            if (GUILayout.Button("Generate TS Files", BtnHeight))
            {
                TsFileGenerateRoot.GenerateTsPanelFiles(this.mBindNode as UiBindRoot);
            }
        }
    }
}