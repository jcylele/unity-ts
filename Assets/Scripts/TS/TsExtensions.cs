using UnityEngine;

public static class TsExtensions
{
    static T AddOrGetComponent<T>(this Component comp) where T : Component
    {
        return comp.gameObject.AddOrGetComponent<T>();
    }

    static T AddOrGetComponent<T>(this GameObject go) where T : Component
    {
        var comp = go.GetComponent<T>();
        if (comp == null)
        {
            comp = go.AddComponent<T>();
        }

        return comp;
    }
}