using UnityEngine;
using UnityEngine.UI;

namespace TS.UI.Components
{
    [DisallowMultipleComponent]
    [AddComponentMenu("TS_UI/TsText")]
    [RequireComponent(typeof(Text))]
    public class TsText : MonoBehaviour
    {
        [SerializeField] private string textId;

        private void Update()
        {
            var text = GetComponent<Text>();
            if (!string.IsNullOrEmpty(this.textId))
            {
                var translatedText = Singleton.Instance.JsManager.JsGetText?.Invoke(this.textId);
                text.text = translatedText ?? this.textId;
                this.textId = null;
            }

            this.enabled = false;
        }
    }
}