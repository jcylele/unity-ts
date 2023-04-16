using System;
using DG.Tweening;
using UnityEngine;

namespace UITween
{
    public abstract class BaseSimpleTweenMono<T> : BaseTweenMono, ITargetTypeLimit where T : struct
    {
        [Header("Single Tween")] [SerializeField]
        private Component target;

        public Component Target => target;

        [SerializeField] private float duration;
        [SerializeField] private T endValue;
        private T startValue;

        // public bool isRelative;
        [SerializeField] private bool isFrom;
        [SerializeField] private Ease easeType = Ease.OutQuad;

        public abstract Type[] ValidTargetTypes { get; }

        private bool mIsInitialized;

        private T EndValue
        {
            get
            {
                InitializeTweenValue();
                return endValue;
            }
        }

        private T StartValue
        {
            get
            {
                InitializeTweenValue();
                return startValue;
            }
        }

        private void InitializeTweenValue()
        {
            if (mIsInitialized)
            {
                return;
            }

            mIsInitialized = true;
            if (isFrom)
            {
                startValue = endValue;
                endValue = this.GetTweenValue();
            }
            else
            {
                startValue = this.GetTweenValue();
            }
        }

        protected sealed override Tween PureTween
        {
            get
            {
                this.ApplyTweenValue(true);
                return this.CreateTweener(EndValue, duration).SetEase(easeType);
            }
        }

        protected abstract Tweener CreateTweener(T endValue, float duration);
        protected abstract T GetTweenValue();

        public sealed override void ApplyTweenValue(bool bFrom)
        {
            this.InnerApplyTweenValue(bFrom ? StartValue : EndValue);
        }

        protected abstract void InnerApplyTweenValue(T value);
    }
}