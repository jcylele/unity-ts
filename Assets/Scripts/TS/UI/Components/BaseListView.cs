using System;
using UnityEngine;

namespace TS.UI
{
    public class BaseListView : MonoBehaviour
    {
        public UiBindNode ChildTemplate;

        public Action<UiBindNode, int> JsFillItem;

        public virtual void SetCount(int count)
        {
            throw new NotImplementedException($"{this.GetType()} should implement SetCount(int count)");
        }

        protected virtual void Awake()
        {
            //if ChildTemplate is in prefab, this will permanently change the prefab
            if (ChildTemplate.gameObject.scene != default)
            {
                ChildTemplate.SetActive(false);
            }
        }

        public virtual UiBindNode this[int index] =>
            throw new NotImplementedException($"{this.GetType()} should implement this[int index]");

        protected virtual void OnDestroy()
        {
            JsFillItem = null;
        }
    }
}