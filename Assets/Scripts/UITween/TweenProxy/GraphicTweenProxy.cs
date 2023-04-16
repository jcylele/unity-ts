using DG.Tweening;

namespace UITween.TweenProxy
{
    public class GraphicTweenProxy : IFade
    {
        private readonly UnityEngine.UI.Graphic mGraphic;

        public GraphicTweenProxy(UnityEngine.UI.Graphic graphic)
        {
            this.mGraphic = graphic;
        }

        public void SetFadeValue(float val)
        {
            var oldColor = mGraphic.color;
            oldColor.a = val;
            mGraphic.color = oldColor;
        }

        public float GetFadeValue()
        {
            return mGraphic.color.a;
        }

        public DG.Tweening.Tweener CreateFadeTweener(float endValue, float duration)
        {
            return mGraphic.DOFade(endValue, duration);
        }
    }
}