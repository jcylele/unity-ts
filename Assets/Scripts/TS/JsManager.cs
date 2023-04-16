using Puerts;
using System;
using TS.UI;
using UITween;
using UnityEngine;
using UnityEngine.UI;

namespace TS
{
    public class JsManager : MonoBehaviour
    {
        private static JsEnv jsEnv;

        public Action JsStart;
        public Action<float> JsUpdate;
        public Action JsOnDestroy;
        public Action JsTest;
        public Func<string, string> JsGetText;

        void Start()
        {
            //init JsEnv after all Monobehaviour.Awake
            jsEnv ??= new JsEnv(new TsScriptLoader(), Const.TsDebugPort);
            AddUsing();

            jsEnv.ExecuteModule("index");

            JsStart?.Invoke();
        }

        void AddUsing()
        {
            jsEnv.UsingAction<float>();
            jsEnv.UsingAction<UiBindRoot, int>();
            jsEnv.UsingAction<UiBindNode, int>();
            jsEnv.UsingAction<Slider, float>();
            jsEnv.UsingAction<string>();
            jsEnv.UsingAction<int, TweenTiming, string>();
            jsEnv.UsingFunc<string, string>();
        }

        void Update()
        {
            jsEnv.Tick();
            JsUpdate?.Invoke(Time.deltaTime);
        }

        void OnDestroy()
        {
            JsOnDestroy?.Invoke();
            JsStart = null;
            JsUpdate = null;
            JsOnDestroy = null;
            JsTest = null;
            jsEnv.Dispose();
        }

        public void Test()
        {
            JsTest?.Invoke();
        }
    }
}