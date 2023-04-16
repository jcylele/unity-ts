using DG.Tweening;
using UnityEngine;

namespace UITween.TweenProxy
{
    public class RendererTweenProxy : IFade
    {
        private readonly Renderer mRenderer;

        public RendererTweenProxy(Renderer renderer)
        {
            this.mRenderer = renderer;
        }

        public void SetFadeValue(float val)
        {
            var material = mRenderer.material;
            var oldMaterialColor = material.color;
            oldMaterialColor.a = val;
            material.color = oldMaterialColor;
        }

        public float GetFadeValue()
        {
            return mRenderer.material.color.a;
        }

        public Tweener CreateFadeTweener(float endValue, float duration)
        {
            return mRenderer.material.DOFade(endValue, duration);
        }
    }
}