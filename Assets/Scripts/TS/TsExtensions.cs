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