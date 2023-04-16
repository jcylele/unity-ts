using System.Collections.Generic;
using UnityEngine;

namespace UITween.Editor
{
    public class TweenRunnerEditor : UnityEditor.Editor
    {
        private TweenRootMono mTarget;
        private GUIStyle mRedLabel;

        private void OnEnable()
        {
            mTarget = target as TweenRootMono;
            this.mRedLabel = new GUIStyle { normal = { textColor = Color.red } };
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            var errorStr = CheckTweens();
            if (!string.IsNullOrEmpty(errorStr))
            {
                GUILayout.Label(errorStr, this.mRedLabel);
            }
        }

        private string CheckTweens()
        {
            var timingSet = new HashSet<TweenTiming>();
            var nameSet = new HashSet<string>();
            foreach (var tween in mTarget.rootTweenInfos)
            {
                if (!timingSet.Add(tween.timing))
                {
                    if (tween.timing != TweenTiming.None)
                    {
                        return $"Multiple tween with timing {tween.timing}";
                    }
                }

                if (!nameSet.Add(tween.name) && !string.IsNullOrEmpty(tween.name))
                {
                    return $"Multiple tween with name {tween.name}";
                }
            }

            return null;
        }
    }
}