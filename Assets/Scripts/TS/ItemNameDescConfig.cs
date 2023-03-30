using System;
using System.Collections.Generic;
using UnityEngine;

namespace TS
{
    [Flags]
    public enum TextType
    {
        Name = 1,
        Desc = 2,
    }

    [Serializable]
    public class ItemTypeConfig
    {
        public string configFileName;
        public string prefix;
        public string fieldName;
        public TextType textType;
    }

    [CreateAssetMenu(menuName = "TS/_ItemNameDescConfig")]
    public class ItemNameDescConfig : ScriptableObject
    {
        public List<ItemTypeConfig> configs;
    }
}