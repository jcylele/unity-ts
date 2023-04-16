using System;
using DG.Tweening;
using UITween.TweenProxy;
using UnityEngine;

namespace UITween
{
    public interface ILocalMove
    {
        void SetLocalMoveValue(Vector3 val);
        Vector3 GetLocalMoveValue();
        Tweener CreateLocalMoveTweener(Vector3 endValue, float duration);
    }

    public class LocalMoveTweenMono : BaseSimpleTweenMono<Vector3>
    {
        public override Type[] ValidTargetTypes => new[] { typeof(RectTransform) };

        protected override Tweener CreateTweener(Vector3 endValue, float duration)
        {
            return this.mLocalMove.CreateLocalMoveTweener(endValue, duration);
        }

        protected override Vector3 GetTweenValue()
        {
            return this.mLocalMove.GetLocalMoveValue();
        }

        protected override void InnerApplyTweenValue(Vector3 value)
        {
            this.mLocalMove.SetLocalMoveValue(value);
        }

        private ILocalMove mLocalMove;

        private void Awake()
        {
            mLocalMove = Target switch
            {
                RectTransform rectTransform => new RectTransformTweenProxy(rectTransform),
                _ => throw new Exception($"Invalid target type: {Target}")
            };
        }
    }
}