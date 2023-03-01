using System.Collections.Generic;
using System.Linq;
using UnityEngine;

namespace TS.UI
{
    public class UiBindPool : MonoBehaviour
    {
        public GameObject Prefab;

        private readonly List<UiBindNode> mBindContainers = new List<UiBindNode>();

        public UiBindNode Get()
        {
            foreach (var component in mBindContainers.Where(component => !component.gameObject.activeSelf))
            {
                component.SetActive(true);
                return component;
            }

            var go = Instantiate(Prefab, transform);

            var newComponent = go.GetComponent<UiBindNode>();
            mBindContainers.Add(newComponent);
            // newComponent.BelongedPool = this;

            return newComponent;
        }

        public void Return(UiBindNode component)
        {
            component.SetActive(false);
        }
    }
}
