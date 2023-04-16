using System;
using DG.Tweening;
using UITween.TweenProxy;
using UnityEngine;
using UnityEngine.UI;

namespace UITween
{
    public interface IFade
    {
        void SetFadeValue(float val);
        float GetFadeValue();
        Tweener CreateFadeTweener(float endValue, float duration);
    }

    public class FadeTweenMono : BaseSimpleTweenMono<float>
    {
        private IFade mFade;

        private void Awake()
        {
            mFade = Target switch
            {
                SpriteRenderer spriteRenderer => new SpriteRendererTweenProxy(spriteRenderer),
                Renderer _renderer => new RendererTweenProxy(_renderer),
                Light _light => new LightTweenProxy(_light),
                Graphic _graphic => new GraphicTweenProxy(_graphic),
                _ => throw new Exception($"Invalid target type: {Target}")
            };
        }

        public override Type[] ValidTargetTypes
        {
            get { return new[] { typeof(SpriteRenderer), typeof(Renderer), typeof(Light), typeof(Graphic) }; }
        }

        protected override Tweener CreateTweener(float endValue, float duration)
        {
            return this.mFade.CreateFadeTweener(endValue, duration);
        }

        protected override float GetTweenValue()
        {
            return this.mFade.GetFadeValue();
        }

        protected override void InnerApplyTweenValue(float value)
        {
            this.mFade.SetFadeValue(value);
        }
    }
}