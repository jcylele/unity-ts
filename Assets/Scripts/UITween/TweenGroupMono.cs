using System.Collections.Generic;
using DG.Tweening;
using UnityEngine;

namespace UITween
{
    public class TweenGroupMono : BaseTweenMono
    {
        [Header("Tween Group")] public bool isParallel;
        public List<BaseTweenMono> tweens = new List<BaseTweenMono>();

        protected override Tween PureTween
        {
            get
            {
                var sequence = DOTween.Sequence();
                foreach (var tween in tweens)
                {
                    if (isParallel)
                    {
                        sequence.Join(tween.Tween);
                    }
                    else
                    {
                        sequence.Append(tween.Tween);
                    }
                }

                return sequence;
            }
        }

        public override void ApplyTweenValue(bool bFrom)
        {
            foreach (var tween in tweens)
            {
                tween.ApplyTweenValue(bFrom);
            }
        }
    }
}