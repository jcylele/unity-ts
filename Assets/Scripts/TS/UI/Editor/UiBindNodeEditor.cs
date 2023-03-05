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

        void OnEnable()
        {
            mBindNode = (UiBindNode)target;
            if (string.IsNullOrEmpty(mBindNode.NodeName))
            {
                mBindNode.NodeName = mBindNode.name;
                EditorUtility.SetDirty(mBindNode);
            }
        }

        private void RemoveInvalid()
        {
            foreach (var bindElement in mBindNode.BindElements)
            {
                
            }
            for(int i = mBindNode.BindElements.Count - 1; i >= 0; i--)
            {
                if (mBindNode.BindElements[i].ElemComponent == null)
                {
                    mBindNode.BindElements.RemoveAt(i);
                }
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

            if (namedElements.Count > 0 || mBindNode.NodeName != mBindNode.name)
            {
                if (GUILayout.Button("Refresh Names", EditorConst.BtnHeight))
                {
                    foreach (var bindElement in namedElements)
                    {
                        bindElement.ElemName = bindElement.ElemComponent.name;
                    }

                    mBindNode.NodeName = mBindNode.name;

                    Debug.Log("All Names Restored");
                    //EditorUtility.SetDirty(mBindNode);
                }
            }
        }

        private void ShowGenerateButton()
        {
            if (mBindNode.transform.parent == null)
            {
                if (GUILayout.Button("Generate TS Files", EditorConst.BtnHeight))
                {
                    if (mBindNode is UiBindRoot bindRoot)
                    {
                        TsFileGenerateRoot.GenerateTsPanelFiles(bindRoot);
                    }
                    else
                    {
                        TsFileGenerateRoot.GenerateTsWidgetFiles(mBindNode);
                    }
                }
            }
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            RemoveInvalid();
            ShowRenameButton();
            ShowGenerateButton();
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
}