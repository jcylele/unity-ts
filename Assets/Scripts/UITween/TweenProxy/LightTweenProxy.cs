using DG.Tweening;
using UnityEngine;

namespace UITween.TweenProxy
{
    public class LightTweenProxy : IFade
    {
        private readonly Light mLight;

        public LightTweenProxy(Light light)
        {
            this.mLight = light;
        }

        public void SetFadeValue(float val)
        {
            mLight.intensity = val;
        }

        public float GetFadeValue()
        {
            return mLight.intensity;
        }

        public Tweener CreateFadeTweener(float endValue, float duration)
        {
            return mLight.DOIntensity(endValue, duration);
        }
    }
}