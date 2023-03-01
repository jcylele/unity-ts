using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace TS.UI
{
    public class ScrollView : BaseListView
    {
        public int ExtraCount = 2;
        private int mTotalCount;

        // private ScrollRect mScrollRect;
        private RectTransform mContentRt;
        private Vector2 mLastPosition;
        private float mChildHeight;
        private float mViewHeight;
        private int mHalfShowCount;
        private int mMinIndex = 0;
        private int mMaxIndex = -1;
        private readonly Stack<UiBindNode> mCachedChildren = new Stack<UiBindNode>();
        private readonly Dictionary<int, UiBindNode> mShownChildren = new Dictionary<int, UiBindNode>();

        private void Init()
        {
            ChildTemplate.SetActive(false);
            mChildHeight = ChildTemplate.GetComponent<RectTransform>().rect.height;

            var scrollRect = GetComponent<ScrollRect>();
            mContentRt = scrollRect.content;

            var rt = scrollRect.GetComponent<RectTransform>();
            mViewHeight = rt.rect.height;

            var visibleCount = (int)Math.Ceiling(mViewHeight / mChildHeight);
            mHalfShowCount = visibleCount / 2 + ExtraCount;
        }

        protected override void Awake()
        {
            base.Awake();

            Init();

            RefreshLayout();
        }

        void LateUpdate()
        {
            var newPos = mContentRt.anchoredPosition;
            if (Math.Abs(mLastPosition.y - newPos.y) <= mChildHeight)
            {
                return;
            }

            // Debug.Log(newPos);
            mLastPosition = newPos;
            RefreshLayout();
        }

        private UiBindNode AddChild()
        {
            var bindNode = mCachedChildren.Count > 0
                ? mCachedChildren.Pop()
                : Instantiate(ChildTemplate, mContentRt);
            bindNode.SetActive(true);
            return bindNode;
        }

        private void RemoveChild(UiBindNode bindNode)
        {
            mCachedChildren.Push(bindNode);
            bindNode.SetActive(false);
        }

        private void RefreshChildren(int newMinIndex, int newMaxIndex)
        {
            //hide
            for (int i = mMinIndex; i <= mMaxIndex; i++)
            {
                if (i >= newMinIndex && i <= newMaxIndex) continue;

                RemoveChild(mShownChildren[i]);
                mShownChildren.Remove(i);
            }

            //show
            for (int i = newMinIndex; i <= newMaxIndex; i++)
            {
                if (mShownChildren.ContainsKey(i)) continue;

                var bindNode = AddChild();
                mShownChildren.Add(i, bindNode);
                SetChildPosition(bindNode, i);
                JsFillItem?.Invoke(bindNode, i);
            }

            mMinIndex = newMinIndex;
            mMaxIndex = newMaxIndex;
        }

        private void RefreshLayout()
        {
            var midIndex = (int)Math.Floor((mLastPosition.y + 0.5f * mViewHeight) / mChildHeight);

            var newMinIndex = Math.Max(midIndex - mHalfShowCount, 0);
            var newMaxIndex = Math.Min(midIndex + mHalfShowCount, mTotalCount - 1);

            RefreshChildren(newMinIndex, newMaxIndex);
        }

        private void SetChildPosition(UiBindNode bindNode, int index)
        {
            var rt = bindNode.GetComponent<RectTransform>();
            rt.anchoredPosition = new Vector2(0f, -index * mChildHeight);
        }

        public override void SetCount(int count)
        {
            //hide all children
            RefreshChildren(0, -1);
            mTotalCount = count;
            //set height
            mContentRt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, mTotalCount * mChildHeight);
            //reset position
            mContentRt.anchoredPosition = Vector2.zero;
            mLastPosition = Vector2.zero;
            //show visible children
            RefreshLayout();
        }

        public override UiBindNode this[int index]
        {
            get
            {
                if (mShownChildren.TryGetValue(index, out var bindNode))
                {
                    return bindNode;
                }

                throw new KeyNotFoundException($"Get {index}th UiBindNode failed");
            }
        }
    }
}