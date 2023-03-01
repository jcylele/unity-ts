using System.Collections.Generic;

namespace TS.UI
{
    public class ListView : BaseListView
    {
        private readonly List<UiBindNode> mChildren = new List<UiBindNode>();

        public override void SetCount(int count)
        {
            //no need to optimize
            for (int i = mChildren.Count; i < count; i++)
            {
                var bindNode = Instantiate(ChildTemplate, transform);
                mChildren.Add(bindNode);
            }

            for (int i = 0; i < count; i++)
            {
                mChildren[i].SetActive(true);
                JsFillItem?.Invoke(mChildren[i], i);
            }

            for (int i = count; i < mChildren.Count; i++)
            {
                mChildren[i].SetActive(false);
            }
        }

        public override UiBindNode this[int index] => this.mChildren[index];
    }
}