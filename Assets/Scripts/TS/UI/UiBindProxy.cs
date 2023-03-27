using UnityEngine;

namespace TS.UI
{
    /// <summary>
    /// A proxy(reference) to prefab with <see cref="UiBindNode"/>
    /// </summary>
    [AddComponentMenu("TS_UI/UiBindProxy")]
    public class UiBindProxy : UiBindNodeProvider
    {
        /// <summary>
        /// Prefab asset with <see cref="UiBindNode"/> on root
        /// </summary>
        public UiBindNode NodePrefab;

        /// <summary>
        /// instance of the prefab, used in runtime
        /// </summary>
        private UiBindNode mNodeInstance;

        /// <summary>
        /// whether the scale of instance is already initialized
        /// </summary>
        private bool mInitialized;

        public override UiBindNode Node
        {
            get
            {
                if (mNodeInstance == null)
                {
                    mNodeInstance = Instantiate(NodePrefab, this.transform);
                }
                return mNodeInstance;
            }
        }

        public override UiBindNode Prefab => this.NodePrefab;

        private void LateUpdate()
        {
            if (mInitialized || mNodeInstance == null)
            {
                return;
            }
            mNodeInstance.GetComponent<RectTransform>().FillParent();
            mInitialized = true;
        }
    }
}
