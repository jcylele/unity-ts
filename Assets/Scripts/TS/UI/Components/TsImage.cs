using UnityEngine;
using UnityEngine.UI;

namespace TS.UI.Components
{
    public class TsImage : Image, IUiResourceUser
    {
        private string mTargetPath;
        private UiResourceLoader mUiResourceLoader;

        public void SetSprite(string path)
        {
            if (mTargetPath == path)
            {
                return;
            }

            this.mTargetPath = path;

            if (this.mUiResourceLoader == null)
            {
                this.mUiResourceLoader = this.gameObject.AddComponent<UiResourceLoader>();
                this.mUiResourceLoader.UiResourceUser = this;
            }

            this.mUiResourceLoader.LoadResource(path);
        }

        public void OnResourceLoaded(Object resource, string path)
        {
            if (path != this.mTargetPath)
            {
                return;
            }

            this.sprite = resource as Sprite;
        }
    }
}