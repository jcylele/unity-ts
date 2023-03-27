using System;
using UnityEngine;

namespace TS.UI.Components
{
    public abstract class BaseContainerView : MonoBehaviour
    {
        //TODO should not be an asset
        public UiBindNodeProvider NodeProvider;

        // can item be selected
        public bool ItemSelectable;

        public Action<UiBindNode, int> JsFillItem;

        public virtual void SetItemCount(int count)
        {
            throw new NotImplementedException($"{this.GetType()} should implement SetItemCount(int count)");
        }

        protected virtual void Awake()
        {
            NodeProvider.SetActive(false);
        }

        protected virtual UiBindNode this[int index] =>
            throw new NotImplementedException($"{this.GetType()} should implement this[int index]");

        protected virtual void OnDestroy()
        {
            JsFillItem = null;
        }

        public void Refresh(int index)
        {
            if (this[index] != null)
            {
                JsFillItem?.Invoke(this[index], index);
            }
        }
    }
}