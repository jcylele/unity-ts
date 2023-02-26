using Puerts;
using System.Collections.Generic;
using TS.UI;
using UnityEngine;
using UnityEngine.UI;

namespace TS
{
    [Configure]
    public class PuertsConfig
    {
        [Binding]
        static IEnumerable<System.Type> Bindings
        {
            get
            {
                var result = new List<System.Type>()
                {
                    typeof(System.Delegate),
                    typeof(System.Object),
                    typeof(System.Type),

                    typeof(Debug),
                    typeof(Vector3),
                    typeof(Time),
                    typeof(Transform),
                    typeof(Component),
                    typeof(GameObject),
                    typeof(Object),
                    typeof(ParticleSystem),
                    typeof(Canvas),
                    typeof(RenderMode),
                    typeof(Behaviour),
                    typeof(MonoBehaviour),
                    typeof(Button),
                    typeof(Slider),
                    typeof(Image),
                    typeof(Text),

                    typeof(JsManager),
                    // typeof(UiBindElement),
                    typeof(UiBindNode),
                    typeof(UiBindRoot),
                    typeof(UiEventManager),
                    typeof(UiManager),
                };
                //Other Types
                return result;
            }
        }
    }
}