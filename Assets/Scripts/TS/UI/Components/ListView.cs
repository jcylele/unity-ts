using System.Collections.Generic;

namespace TS.UI
{
    public class ListView : BaseListView
    {
        private readonly List<UiBindNodeProvider> mChildren = new List<UiBindNodeProvider>();

        public override void SetCount(int count)
        {
            //no need to optimize
            for (int i = mChildren.Count; i < count; i++)
            {
                var bindNode = Instantiate(NodeProvider, transform);
                mChildren.Add(bindNode);
            }

            for (int i = 0; i < count; i++)
            {
                mChildren[i].SetActive(true);
                JsFillItem?.Invoke(mChildren[i].Node, i);
            }

            for (int i = count; i < mChildren.Count; i++)
            {
                mChildren[i].SetActive(false);
            }
        }

        protected override UiBindNode this[int index]
        {
            get
            {
                if (index >= 0 && index < this.mChildren.Count)
                {
                    return this.mChildren[index].Node;
                }
                return null;
            }
        }
    }
}