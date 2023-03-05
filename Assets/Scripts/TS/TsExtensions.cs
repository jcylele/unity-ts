using UnityEngine;

namespace TS
{
    /// <summary>
    /// extension methods for components and game object
    /// </summary>
    public static class TsExtensions
    {
        /// <summary>
        /// Change anchors and pivot while keeping the position and size
        /// <para>at the first frame, a stretched transform's size is wrong</para>
        /// </summary>
        /// <param name="rt"></param>
        /// <param name="anchor">anchor and pivot</param>
        public static void SetAnchorsAndPivot(this RectTransform rt, Vector2 anchor)
        {
            // cache size
            var size = rt.rect.size;

            // cache local position(this.pivot - parent.pivot)
            var localPos = rt.localPosition;

            //calculate offset
            var dp = anchor - rt.pivot;
            dp *= size;
            localPos += new Vector3(dp.x, dp.y, 0f);

            //set anchors
            rt.anchorMin = anchor;
            rt.anchorMax = anchor;

            //set pivot
            rt.pivot = anchor;

            //restore position
            rt.localPosition = localPos;

            //restore size
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Horizontal, size.x);
            rt.SetSizeWithCurrentAnchors(RectTransform.Axis.Vertical, size.y);
        }

        /// <summary>
        /// adjust recttransform of <see cref="mInstance"/> to fill parent(this)
        /// <para>mainly through scale, otherwise the layout will be a mess</para>
        /// <para>due to first frame strectch size bug, should be called after that</para>
        /// </summary>
        public static void FillParent(this RectTransform rt)
        {
            var pRt = rt.parent as RectTransform;
            var pRect = pRt.rect;
            //child should keep original size
            if (pRect.height == 0 && pRect.width == 0)
            {
                return;
            }

            var childRect = rt.rect;
            if (childRect.height == 0 || childRect.width == 0)
            {
                throw new System.Exception("UiBindNode prefab with 0 width/height");
            }

            //scale to fit
            var scale = new Vector3(pRect.width / childRect.width,
                pRect.height / childRect.height,
                1f);

            //if size on axis is 0, scale by the same amount of another axis
            if (scale.x == 0f) scale.x = scale.y;
            if (scale.y == 0f) scale.y = scale.x;
            rt.localScale = scale;

            //change anchors and pivot
            rt.pivot = new Vector2(0.5f, 0.5f);
            rt.anchorMin = new Vector2(0.5f, 0.5f);
            rt.anchorMax = new Vector2(0.5f, 0.5f);
            rt.anchoredPosition = new Vector2(0f, 0f);
        }

        public static bool IsInPrefab(this GameObject go)
        {
            return go.scene == default;
        }

        public static T AddOrGetComponent<T>(this Component comp) where T : Component
        {
            return comp.gameObject.AddOrGetComponent<T>();
        }

        public static void SetActive(this Component comp, bool val)
        {
            comp.gameObject.SetActive(val);
        }

        public static T AddOrGetComponent<T>(this GameObject go) where T : Component
        {
            var comp = go.GetComponent<T>();
            if (comp == null)
            {
                comp = go.AddComponent<T>();
            }

            return comp;
        }
    }
}