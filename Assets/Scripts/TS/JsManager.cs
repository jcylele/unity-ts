using Puerts;
using System;
using TS.UI;
using UnityEngine;
using UnityEngine.UI;

namespace TS
{
    public class JsManager : MonoBehaviour
    {
        private static JsEnv jsEnv;

        public static JsManager Instance { get; private set; }

        public Action JsStart;
        public Action<float> JsUpdate;
        public Action JsOnDestroy;
        public Action JsTest;

        void Awake()
        {
            if (Instance != null)
            {
                Destroy(this.gameObject);
                return;
            }
            Instance = this;
        }

        void Start()
        {
            //init JsEnv after all Monobehaviour.Awake
            jsEnv ??= new JsEnv(new TsLoader(), 8758);
            jsEnv.UsingAction<float>();
            jsEnv.UsingAction<UiBindNode, int>();
            jsEnv.UsingAction<Slider, float>();

            jsEnv.ExecuteModule("index");

            JsStart?.Invoke();
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