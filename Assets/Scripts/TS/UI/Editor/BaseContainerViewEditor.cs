using TS.UI.Components;
using UnityEditor;

namespace TS.UI.Editor
{
    [CustomEditor(typeof(BaseContainerView), true)]
    public class BaseContainerViewEditor : UnityEditor.Editor
    {
        private const string StrNotChildError =
            "transform of NodeProvider is not child of Container transform\n use TsProxy(UiBindProxy) to refer widgets if needed";

        private BaseContainerView mContainerView;

        private void OnEnable()
        {
            mContainerView = (BaseContainerView)target;
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            if (mContainerView.NodeProvider != null &&
                !mContainerView.NodeProvider.transform.IsChildOf(mContainerView.transform))
            {
                mContainerView.NodeProvider = null;
                EditorUtility.DisplayDialog("ERROR", StrNotChildError, "ok");
            }
        }
    }
}