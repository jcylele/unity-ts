using TS.UI;
using UnityEngine;

namespace TS
{
    /// <summary>
    /// All single mono behaviours and classes should be placed here
    /// </summary>
    public class Singleton : MonoBehaviour
    {
        public static Singleton Instance { get; private set; }

        void Awake()
        {
            if (Instance != null)
            {
                Destroy(this.gameObject);
                return;
            }

            Instance = this;
        }

        #region Mono Behaviours

        public JsManager JsManager;

        public UiManager UiManager;

        #endregion

        #region Normal Classes

        private UiEventManager mUiEventManager;
        public UiEventManager UiEventManager
        {
            get
            {
                mUiEventManager ??= new UiEventManager();
                return mUiEventManager;
            }
        }

        #endregion

        /// <summary>
        /// Create a game object with a component of type T
        /// <para>Used to delay the  creation mono behaviours</para>
        /// </summary>
        /// <typeparam name="T">component type</typeparam>
        /// <returns>instantiated component</returns>
        private T CreateSingleton<T>() where T : MonoBehaviour
        {
            var tt = typeof(T);
            var go = new GameObject(tt.Name, tt);
            return go.GetComponent<T>();
        }

    }
}