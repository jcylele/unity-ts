using System.Collections.Generic;
using UnityEngine;

namespace TS.UI
{
    public class ListView : MonoBehaviour
    {
        public UiBindNode ChildTemplate;
        [ReadOnly] public bool IsTemplatePrefab;

        private readonly List<UiBindNode> mChildren = new List<UiBindNode>();

        private int mCount;

        public int Count
        {
            get => mCount;
            set
            {
                //no need to optimize
                for (int i = mChildren.Count; i < value; i++)
                {
                    var bindNode = Instantiate(ChildTemplate, transform);
                    mChildren.Add(bindNode);
                }

                for (int i = 0; i < value; i++)
                {
                    mChildren[i].gameObject.SetActive(true);
                }

                for (int i = value; i < mChildren.Count; i++)
                {
                    mChildren[i].gameObject.SetActive(false);
                }

                mCount = value;
            }
        }

        public UiBindNode this[int index] => this.mChildren[index];

        void Awake()
        {
            if (!this.IsTemplatePrefab)
            {
                //if ChildTemplate is in prefab, this will permanently change the prefab
                ChildTemplate.gameObject.SetActive(false);
            }
        }
    }
}