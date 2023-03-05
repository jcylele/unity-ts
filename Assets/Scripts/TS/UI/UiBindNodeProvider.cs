using UnityEngine;

namespace TS.UI
{
    public abstract class UiBindNodeProvider : MonoBehaviour
    {
        public abstract UiBindNode Node { get; }
        public abstract UiBindNode Prefab { get; }
    }
}
