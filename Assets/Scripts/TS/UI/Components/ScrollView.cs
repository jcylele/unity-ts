using System;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

namespace TS.UI
{
    public class ScrollView : BaseListView
    {
        /// <summary>
        /// direction of the scroll view
        /// </summary>
        public RectTransform.Axis Axis;

        /// <summary>
        /// little trick, using index instead of if else
        /// </summary>
        private int AxisValue => (int)Axis;

        /// <summary>
        /// multiples positions in different directions
        /// </summary>
        private float AxisPosFactor
        {
            get
            {
                return Axis switch
                {
                    //Left To Right
                    RectTransform.Axis.Horizontal => 1f,
                    //Top To Bottom
                    RectTransform.Axis.Vertical => -1f,
                    _ => throw new ArgumentOutOfRangeException()
                };
            }
        }

        /// <summary>
        /// space between items
        /// </summary>
        [Tooltip("space between items")] public float Spacing;

        /// <summary>
        /// count of items shown outside the viewport
        /// <para>should be adjusted according to user experience</para>
        /// </summary>
        [Tooltip("extra item count outside the viewport, change for experience")]
        public int ExtraCount = 2;

        /// <summary>
        /// extra count before an item is hidden, to avoid show-hide repetition
        /// items beyond (ExtraCount + ExtraHiddenCount) will be hidden
        /// <para>should be adjusted according to user experience</para>
        /// </summary>
        [Tooltip("more extra item count outside the viewport, change for experience")]
        public int ExtraHiddenCount = 1;

        /// <summary>
        /// total count of items, set in runtime
        /// </summary>
        private int mTotalCount;

        /// <summary>
        /// ScrollRect.content
        /// <para>parent of all items</para>
        /// </summary>
        private RectTransform mContentRt;

        /// <summary>
        /// last position of content
        /// <para>layout will be rebuilt if current position is far enough from it</para>
        /// </summary>
        private Vector2 mLastPosition;

        /// <summary>
        /// item size
        /// </summary>
        private Vector2 mChildSize;

        /// <summary>
        /// viewport size
        /// <para>Due to some bugs, actually size of ScrollRect is used</para>
        /// </summary>
        private Vector2 mViewSize;

        /// <summary>
        /// half of count of shown items, calculated by mChildSize and mViewSize
        /// </summary>
        private int mHalfShowCount;

        /// <summary>
        /// the minimum index of all shown items
        /// </summary>
        private int mMinIndex = 0;

        /// <summary>
        /// the maximum index of all shown items
        /// </summary>
        private int mMaxIndex = -1;

        /// <summary>
        /// hidden items
        /// </summary>
        private readonly Stack<UiBindNode> mCachedChildren = new Stack<UiBindNode>();

        /// <summary>
        /// shown items, key is index
        /// </summary>
        private readonly Dictionary<int, UiBindNode> mShownChildren = new Dictionary<int, UiBindNode>();

        /// <summary>
        /// is sizes calculated
        /// at the first frame, rect size of stretched transform is incorrect
        /// <para>so initialization should be placed after the layout</para>
        /// <para>LateUpdate seems working</para>
        /// </summary>
        private bool mInitialized;

        /// <summary>
        /// initialize variables
        /// </summary>
        private void Init()
        {
            mChildSize = ChildTemplate.GetComponent<RectTransform>().rect.size;

            var scrollRect = GetComponent<ScrollRect>();
            mContentRt = scrollRect.content;

            var rt = scrollRect.GetComponent<RectTransform>();
            mViewSize = rt.rect.size;

            var visibleCount = (int)Math.Ceiling(mViewSize[AxisValue] / mChildSize[AxisValue]);
            mHalfShowCount = visibleCount / 2 + ExtraCount;
        }

        void LateUpdate()
        {
            if (!mInitialized)
            {
                Init();
                mInitialized = true;
                SetCount(mTotalCount);
                return;
            }

            var newPos = mContentRt.anchoredPosition;
            // if delta position is not large enough, skip
            if (Math.Abs(mLastPosition[AxisValue] - newPos[AxisValue]) <= (mChildSize[AxisValue] + Spacing))
            {
                return;
            }

            // Debug.Log(newPos);
            mLastPosition = newPos;
            RefreshLayout();
        }

        private UiBindNode AddChild()
        {
            UiBindNode bindNode = null;
            if (mCachedChildren.Count > 0)
            {
                bindNode = mCachedChildren.Pop();
            }
            else
            {
                bindNode = Instantiate(ChildTemplate, mContentRt);
                var v2 = Axis == RectTransform.Axis.Horizontal
                    ? new Vector2(0f, 0.5f)
                    : new Vector2(0.5f, 1f);
                var rt = bindNode.GetComponent<RectTransform>();
                rt.SetAnchorsAndPivot(v2);
            }

            bindNode.SetActive(true);
            return bindNode;
        }

        private void RemoveChild(UiBindNode bindNode)
        {
            mCachedChildren.Push(bindNode);
            bindNode.SetActive(false);
        }

        /// <summary>
        /// hide unseen items and show new seen items
        /// </summary>
        /// <param name="newMinIndex">minimal index of new seen items</param>
        /// <param name="newMaxIndex">maximal index of new seen items</param>
        private void RefreshChildren(int newMinIndex, int newMaxIndex)
        {
            var newShowMinIndex = Math.Max(newMinIndex - ExtraHiddenCount, 0);
            var newShowMaxIndex = Math.Min(newMaxIndex + ExtraHiddenCount, mTotalCount - 1);
            //hide items outside of [newShowMinIndex, newShowMaxIndex]
            for (int i = mMinIndex; i <= mMaxIndex; i++)
            {
                if (i >= newShowMinIndex && i <= newShowMaxIndex) continue;

                if (mShownChildren.TryGetValue(i, out var bindNode))
                {
                    RemoveChild(bindNode);
                    mShownChildren.Remove(i);
                }
                else
                {
                    throw new KeyNotFoundException("Something weird happened");
                }
            }

            //show items in [newMinIndex, newMaxIndex]
            for (int i = newMinIndex; i <= newMaxIndex; i++)
            {
                if (mShownChildren.ContainsKey(i)) continue;

                var bindNode = AddChild();
                mShownChildren.Add(i, bindNode);
                SetChildPosition(bindNode, i);
                JsFillItem?.Invoke(bindNode, i);
#if UNITY_EDITOR
                bindNode.name = $"{ChildTemplate.name}({i})";
#endif
            }


            mMinIndex = newMinIndex;
            //find minimum index
            for (var i = newMinIndex - 1; i >= newShowMinIndex; i--)
            {
                if (mShownChildren.ContainsKey(i))
                {
                    mMinIndex = i;
                }
                else
                {
                    break;
                }
            }

            mMaxIndex = newMaxIndex;
            //find maximum index
            for (var i = newMaxIndex + 1; i <= newShowMaxIndex; i++)
            {
                if (mShownChildren.ContainsKey(i))
                {
                    mMaxIndex = i;
                }
                else
                {
                    break;
                }
            }
        }

        /// <summary>
        /// calculate new show indices and refresh items
        /// </summary>
        private void RefreshLayout()
        {
            if (!this.mInitialized)
            {
                return;
            }

            var midIndex =
                (int)Math.Floor((-AxisPosFactor * mLastPosition[AxisValue] + 0.5f * mViewSize[AxisValue]) /
                                (mChildSize[AxisValue] + Spacing));

            var newMinIndex = Math.Max(midIndex - mHalfShowCount, 0);
            var newMaxIndex = Math.Min(midIndex + mHalfShowCount, mTotalCount - 1);

            RefreshChildren(newMinIndex, newMaxIndex);
        }

        private void SetChildPosition(UiBindNode bindNode, int index)
        {
            var rt = bindNode.GetComponent<RectTransform>();
            var pos = Vector2.zero;
            pos[AxisValue] = index * (mChildSize[AxisValue] + Spacing) * AxisPosFactor;
            rt.anchoredPosition = pos;
        }

        public override void SetCount(int count)
        {
            mTotalCount = count;
            if (!mInitialized)
            {
                return;
            }
            //hide all children
            RefreshChildren(0, -1);
            //set height
            var totalLength = 0f;
            if (mTotalCount > 0)
            {
                totalLength = mTotalCount * mChildSize[AxisValue] + (mTotalCount - 1) * Spacing;
            }

            mContentRt.SetSizeWithCurrentAnchors(Axis, totalLength);
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