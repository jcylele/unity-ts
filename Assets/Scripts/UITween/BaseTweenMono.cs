using System;
using DG.Tweening;
using UnityEngine;

namespace UITween
{
    public abstract class BaseTweenMono : MonoBehaviour
    {
        [Header("Common")] public float delay;
        public int loops = 1;
        public LoopType loopType = LoopType.Restart;

        public void Play(TweenCallback completeCallback = null)
        {
            var tween = this.Tween;
            
            tween.onComplete = completeCallback;
            tween.Play();
        }

        private Tween DecoratedTween(Tween tween)
        {
            return tween.SetDelay(delay).SetLoops(loops, loopType);
        }

        public Tween Tween => this.DecoratedTween(PureTween);

        protected abstract Tween PureTween { get; }

        public abstract void ApplyTweenValue(bool bFrom);
    }
}