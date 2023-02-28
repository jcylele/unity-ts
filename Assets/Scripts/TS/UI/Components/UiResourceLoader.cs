using System.Collections;
using UnityEngine;

namespace TS.UI
{
    public interface IUiResourceUser
    {
        void OnResourceLoaded(Object resource, string path);
    }

    /// <summary>
    /// asynchronous loader of resources, one loader works for only one purpose of one user
    /// </summary>
    public class UiResourceLoader : MonoBehaviour
    {
        public IUiResourceUser UiResourceUser;

        private string mResourcePath;
        private Coroutine mCoroutine;

        public void LoadResource(string path)
        {
            if (mResourcePath == path)
            {
                return;
            }

            this.mResourcePath = path;

            //Coroutine is killed and unable to run when disable
            if (!this.isActiveAndEnabled) return;

            if (mCoroutine != null)
            {
                StopCoroutine(mCoroutine);
                mCoroutine = null;
            }

            mCoroutine = StartCoroutine(CoLoadResource());
        }

        private IEnumerator CoLoadResource()
        {
            var request = Resources.LoadAsync(this.mResourcePath);
            while (!request.isDone)
            {
                yield return null;
            }

            this.UiResourceUser.OnResourceLoaded(request.asset, this.mResourcePath);
            this.mResourcePath = null;
        }

        void OnEnable()
        {
            if (this.mResourcePath != null)
            {
                mCoroutine = StartCoroutine(CoLoadResource());
            }
        }

        void OnDisable()
        {
            if (mCoroutine != null)
            {
                StopCoroutine(mCoroutine);
                mCoroutine = null;
            }
        }

        void OnDestroy()
        {
            if (mCoroutine != null)
            {
                StopCoroutine(mCoroutine);
                mCoroutine = null;
            }
        }
    }
}