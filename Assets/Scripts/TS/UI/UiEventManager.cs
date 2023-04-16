using System;
using UITween;
using UnityEngine.UI;

namespace TS.UI
{
    public class UiEventManager
    {
        //perfect singleton implement
        //public static UiEventManager Instance { get; } = new UiEventManager();

        public Action<Button> JsOnButtonClick;
        public Action<Slider, float> JsOnSliderValueChange;
        public Action<int, TweenTiming, string> JsOnTweenComplete;

        public void AddButtonClick(Button btn)
        {
            btn.onClick.RemoveAllListeners();
            btn.onClick.AddListener(() => OnButtonClick(btn));
        }

        void OnButtonClick(Button btn)
        {
            JsOnButtonClick?.Invoke(btn);
        }

        public void AddSlideChange(Slider slide)
        {
            slide.onValueChanged.RemoveAllListeners();
            slide.onValueChanged.AddListener((val) => OnSliderValueChange(slide, val));
        }

        void OnSliderValueChange(Slider slider, float val)
        {
            JsOnSliderValueChange?.Invoke(slider, val);
        }
    }
}