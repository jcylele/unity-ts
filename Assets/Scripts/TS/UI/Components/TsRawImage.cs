using UnityEngine;
using UnityEngine.UI;

namespace TS.UI
{
    public class TsRawImage : RawImage, IUiResourceUser
    {
        private string mTargetPath;
        private UiResourceLoader mUiResourceLoader;

        public void SetTexture(string path)
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

            this.texture = resource as Texture;
        }
    }
}