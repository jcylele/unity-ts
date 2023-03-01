using UnityEngine;

public static class TsExtensions
{

    // RectTransform.rect
    // public static Vector2 RealSize(this RectTransform rt)
    // {
    //     if (rt.anchorMin == rt.anchorMax)
    //     {
    //         return rt.sizeDelta;
    //     }
    //
    //     var rtParent = rt.parent as RectTransform;
    //     return rtParent.RealSize() + rt.sizeDelta;
    // }

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