using System;
using System.Collections;
using UnityEngine;

namespace TS.UI
{
    public class UiManager : MonoBehaviour
    {
        public event Action<UiBindNode, int> JsOnPanelLoaded;

        IEnumerator CoLoadPanel(string panelPath, int panelId)
        {
            // Debug.Log($"Load Panel {panelId} At {panelPath}");
            var rr = Resources.LoadAsync<GameObject>(panelPath);
            while (!rr.isDone)
            {
                yield return null;
            }

            if (rr.asset == null)
            {
                Debug.LogError($"Resources.Load Failed: {panelPath}");
                yield break;
            }

            var prefab = rr.asset as GameObject;
            var go = Instantiate(prefab, this.transform);
            var bindRoot = go.GetComponent<UiBindNode>();
            if (bindRoot == null)
            {
                throw new Exception("No UiBindNode found at the root node of a panel");
            }

            OnPanelLoaded(bindRoot, panelId);
        }

        void OnPanelLoaded(UiBindNode bindRoot, int panelId)
        {
            // Debug.Log($"Panel {panelId} Loaded");
            this.JsOnPanelLoaded?.Invoke(bindRoot, panelId);
        }

        public void LoadPanel(string panelPath, int panelId)
        {
            StartCoroutine(CoLoadPanel($"{Const.TsPanelPrefabsPath}\\{panelPath}", panelId));
        }

        public string LoadJson(string path)
        {
            var textAsset = Resources.Load<TextAsset>($"{Const.TsConfigsPath}\\{path}");
            return textAsset.text;
        }
    }
}