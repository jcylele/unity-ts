using UITween;
using UnityEngine;

namespace TS.UI
{
    [RequireComponent(typeof(Canvas))]
    public class UiBindRoot : UiBindNode
    {
        private Canvas mCanvas;
        private TweenRootMono mTweenRootMono;

        public int PanelId { get; set; }

        void Awake()
        {
            mCanvas = GetComponent<Canvas>();
            mTweenRootMono = GetComponent<TweenRootMono>();
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

        public void PlayTween(TweenTiming timing)
        {
            if (mTweenRootMono == null)
            {
                return;
            }

            mTweenRootMono.PlayTween(timing);
        }

        public void PlayTween(string tweenName)
        {
            if (mTweenRootMono == null)
            {
                return;
            }

            mTweenRootMono.PlayTween(tweenName);
        }
    }
}