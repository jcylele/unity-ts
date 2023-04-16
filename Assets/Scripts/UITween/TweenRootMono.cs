using System;
using System.Linq;
using TS;
using UnityEngine;

namespace UITween
{
    [Serializable]
    public class TweenRootInfo
    {
        public TweenTiming timing;
        public string name;
        public BaseTweenMono tweenMono;

        public override string ToString()
        {
            return $"[{this.timing}]({this.name})";
        }
    }

    public enum TweenTiming
    {
        None,
        Open,
        Close,
    }

    public class TweenRootMono : MonoBehaviour
    {
        public TweenRootInfo[] rootTweenInfos;

        public int PanelId { get; set; }

        private TweenRootInfo GetTweenInfo(TweenTiming timing)
        {
            return (from rootTween in rootTweenInfos where rootTween.timing == timing select rootTween)
                .FirstOrDefault();
        }

        private TweenRootInfo GetTweenInfo(string tweenName)
        {
            return (from rootTween in rootTweenInfos where rootTween.name == tweenName select rootTween)
                .FirstOrDefault();
        }

        public void PlayTween(TweenTiming timing)
        {
            var info = GetTweenInfo(timing);
            if (info != null)
            {
                info.tweenMono.Play(() => { OnTweenCompleted(info); });
            }
        }

        public void PlayTween(string tweenName)
        {
            var info = GetTweenInfo(tweenName);
            if (info != null)
            {
                info.tweenMono.Play(() => { OnTweenCompleted(info); });
            }
        }

        // public void ApplyTweenValue(TweenTiming timing, bool bFrom)
        // {
        //     var info = GetTweenInfo(timing);
        //     if (info != null)
        //     {
        //         info.tweenMono.ApplyTweenValue(bFrom);
        //     }
        // }

        private void OnTweenCompleted(TweenRootInfo info)
        {
            Debug.Log($"Tween {info} complete");
            Singleton.Instance.UiEventManager.JsOnTweenComplete?.Invoke(PanelId, info.timing, info.name);
        }
    }
}