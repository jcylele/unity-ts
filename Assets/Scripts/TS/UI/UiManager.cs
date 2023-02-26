﻿using System;
using System.Collections;
using UnityEngine;

namespace TS.UI
{
    public class UiManager : MonoBehaviour
    {
        public static UiManager Instance { get; private set; }

        public event Action<UiBindNode, int> JsOnPanelLoaded;

        void Awake()
        {
            if (Instance != null)
            {
                Destroy(this.gameObject);
                return;
            }

            Instance = this;
        }

        IEnumerator CoLoadPanel(string panelPath, int panelId)
        {
            Debug.Log($"Load Panel {panelId} At {panelPath}");
            // suspend execution for 5 seconds
            var rr = Resources.LoadAsync<GameObject>(panelPath);
            while (!rr.isDone)
            {
                yield return null;
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
            Debug.Log($"Panel {panelId} Loaded");
            this.JsOnPanelLoaded?.Invoke(bindRoot, panelId);
        }

        public void LoadPanel(string panelPath, int panelId)
        {
            StartCoroutine(CoLoadPanel(panelPath, panelId));
        }
    }
}