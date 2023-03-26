using Puerts;
using System.Collections.Generic;
using TS.UI;
using TS.UI.Components;
using UnityEngine;
using UnityEngine.UI;

namespace TS.Editor
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

                    #region Custom UI Components

                    typeof(TsImage),
                    typeof(TsRawImage),
                    typeof(BaseListView),
                    typeof(ListView),
                    typeof(ScrollView),

                    #endregion

                    #region TS related classes
                    typeof(TsExtensions),
                    typeof(UiBindElement),
                    typeof(UiBindNode),
                    typeof(UiBindRoot),
                    typeof(UiBindProxy),

                    typeof(Singleton),
                    typeof(JsManager),
                    typeof(UiEventManager),
                    typeof(UiManager),

                    #endregion
                };
                //Other Types
                return result;
            }
        }
    }
}