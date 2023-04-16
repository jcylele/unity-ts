using DG.Tweening;
using UnityEngine;

namespace UITween.TweenProxy
{
    class SpriteRendererTweenProxy : IFade
    {
        private readonly SpriteRenderer mSpriteRenderer;

        public SpriteRendererTweenProxy(SpriteRenderer spriteRenderer)
        {
            this.mSpriteRenderer = spriteRenderer;
        }

        public void SetFadeValue(float val)
        {
            var oldColor = mSpriteRenderer.color;
            oldColor.a = val;
            mSpriteRenderer.color = oldColor;
        }

        public float GetFadeValue()
        {
            return mSpriteRenderer.color.a;
        }

        public Tweener CreateFadeTweener(float endValue, float duration)
        {
            return mSpriteRenderer.DOFade(endValue, duration);
        }
    }
}