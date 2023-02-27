using UnityEngine;

namespace TS.UI
{
    [RequireComponent(typeof(Canvas))]
    public class UiBindRoot : UiBindNode
    {
        private Canvas mCanvas;

        void Awake()
        {
            mCanvas = GetComponent<Canvas>();
        }

        public void Show(bool visible)
        {
            mCanvas.enabled = visible;
        }

        public void SetSortOrder(int order)
        {
            this.mCanvas.sortingOrder = order;
        }


        public void Destroy()
        {
            Destroy(this.gameObject);
        }
    }
}