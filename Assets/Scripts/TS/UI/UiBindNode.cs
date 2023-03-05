using System;
using System.Collections.Generic;
using UnityEngine;

namespace TS.UI
{
    [Serializable]
    public class UiBindElement
    {
        public string ElemName;
        public Component ElemComponent;

        public UiBindElement(string elemName, Component elemComponent)
        {
            ElemName = elemName;
            ElemComponent = elemComponent;
        }
    }

    [DisallowMultipleComponent]
    public class UiBindNode : UiBindNodeProvider
    {
        public string NodeName;
        public List<UiBindElement> BindElements = new List<UiBindElement>();
        private Dictionary<string, Component> mElementMap;

        // public UiBindPool BelongedPool { set; private get; }

        public Component this[string elemName]
        {
            get
            {
                if (mElementMap == null)
                {
                    mElementMap = new Dictionary<string, Component>();
                    foreach (var bindElement in BindElements)
                    {
                        mElementMap.Add(bindElement.ElemName, bindElement.ElemComponent);
                    }
                }

                if (!mElementMap.TryGetValue(elemName, out var comp))
                {
                    throw new Exception($"{elemName} not exit in {NodeName}");
                }

                return comp;
            }
        }

        public override UiBindNode Node => this;

        public override UiBindNode Prefab => this;

        // public void Return()
        // {
        //     if (this.BelongedPool == null)
        //     {
        //         throw new NullReferenceException("");
        //     }
        //
        //     this.BelongedPool.Return(this);
        // }

#if UNITY_EDITOR
        public bool AddUiBindElement(string compName, Component component)
        {
            foreach (var bindElement in BindElements)
            {
                if (bindElement.ElemComponent == component || bindElement.ElemName == compName)
                {
                    return false;
                }
            }

            BindElements.Add(new UiBindElement(compName, component));
            return true;
        }
#endif
    }
}