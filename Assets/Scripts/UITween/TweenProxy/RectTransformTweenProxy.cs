using DG.Tweening;
using UnityEngine;

namespace UITween.TweenProxy
{
    class RectTransformTweenProxy : ILocalMove
    {
        private readonly RectTransform mRectTransform;

        public RectTransformTweenProxy(RectTransform rectTransform)
        {
            this.mRectTransform = rectTransform;
        }

        public void SetLocalMoveValue(Vector3 val)
        {
            mRectTransform.localPosition = val;
        }

        public Vector3 GetLocalMoveValue()
        {
            return mRectTransform.localPosition;
        }

        public Tweener CreateLocalMoveTweener(Vector3 endValue, float duration)
        {
            return mRectTransform.DOLocalMove(endValue, duration);
        }
    }
}