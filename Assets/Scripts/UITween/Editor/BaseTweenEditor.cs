using System.Linq;
using UnityEditor;
using UnityEngine;

namespace UITween.Editor
{
    [CustomEditor(typeof(BaseTweenMono), true)]
    public class BaseTweenEditor : UnityEditor.Editor
    {
        private GUIStyle mRedLabel;

        private void OnEnable()
        {
            this.mRedLabel = new GUIStyle { normal = { textColor = Color.red } };
        }

        public override void OnInspectorGUI()
        {
            base.OnInspectorGUI();

            var errorStr = CheckTargetType();
            if (!string.IsNullOrEmpty(errorStr))
            {
                GUILayout.Label(errorStr, this.mRedLabel);
            }
        }

        private string CheckTargetType()
        {
            var targetTypeLimit = this.target as ITargetTypeLimit;
            if (targetTypeLimit == null)
            {
                return null;
            }

            if (targetTypeLimit.Target == null)
            {
                return "Target is null";
            }

            var targetType = targetTypeLimit.Target.GetType();
            var limitTypes = targetTypeLimit.ValidTargetTypes;
            if (limitTypes == null) return null;
            var valid = limitTypes.Any(type => targetType == type || targetType.IsSubclassOf(type));
            if (valid)
            {
                return null;
            }

            return $"Invalid target: {targetTypeLimit.Target}";
        }

        [MenuItem("CONTEXT/Component/---Add To TweenGroup---", true)]
        private static bool Validate_AddToParentTweenGroup(MenuCommand command)
        {
            return command.context is BaseTweenMono;
        }

        [MenuItem("CONTEXT/Component/---Add To TweenGroup---")]
        private static void AddToParentTweenGroup(MenuCommand command)
        {
            var tween = command.context as BaseTweenMono;
            if (tween == null)
            {
                return;
            }

            var parent = tween.transform;
            //UiBindRoot can be added to higher UiBindRoot
            if (tween is TweenGroupMono)
            {
                parent = parent.parent;
            }

            var tweenGroup = parent.GetComponentInParent<TweenGroupMono>();
            if (tweenGroup == null)
            {
                Debug.LogError($"No TweenGroup found in parent hierarchy");
                return;
            }

            tweenGroup.tweens.Add(tween);
            EditorUtility.SetDirty(tweenGroup);
        }
    }
}