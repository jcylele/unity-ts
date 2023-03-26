using System;
using System.Collections.Generic;
using System.Text;
using UnityEditor;
using UnityEngine;

namespace TS.UI.Editor.FileGenerator
{
    interface IReplacer
    {
        public int Count { get; }
        public string Separator { get; }

        public string this[int index] { get; }
    }

    class SingleReplacer : IReplacer
    {
        private readonly string mContent;

        public SingleReplacer(string content)
        {
            this.mContent = content;
        }

        public int Count => 1;
        public string Separator => "";
        public string this[int index] => mContent;
    }

    class ListReplacer : IReplacer
    {
        private readonly IList<string> mContentList;

        public ListReplacer(IList<string> contentList, string separator = "")
        {
            mContentList = contentList;
            Separator = separator;
        }

        public int Count => mContentList.Count;
        public string Separator { get; }

        public string this[int index] => mContentList[index];
    }

    public class FileContentFormatter
    {
        private readonly string mAssetPath;
        private readonly Dictionary<string, IReplacer> mReplacer;

        public FileContentFormatter(string assetPath)
        {
            mAssetPath = assetPath;
            mReplacer = new Dictionary<string, IReplacer>();
        }

        private bool CheckPlaceholder(string placeholder)
        {
            if (placeholder.Length < 2)
            {
                return false;
            }

            if (placeholder[0] != '#' || placeholder[placeholder.Length - 1] != '#')
            {
                return false;
            }

            for (int i = 1; i < placeholder.Length - 1; i++)
            {
                if (placeholder[i] == '#')
                {
                    return false;
                }
            }

            return true;
        }

        public FileContentFormatter AddSingleReplacer(string placeholder, string content)
        {
            if (!CheckPlaceholder(placeholder))
            {
                throw new ArgumentException($"invalid placeholder {placeholder}");
            }

            mReplacer.Add(placeholder, new SingleReplacer(content));
            return this;
        }

        public FileContentFormatter AddListReplacer(string placeholder, List<string> content, string separator = "")
        {
            if (!CheckPlaceholder(placeholder))
            {
                throw new ArgumentException($"invalid placeholder {placeholder}");
            }
            //make sure generated content is deterministic/ordered
            content.Sort();
            mReplacer.Add(placeholder, new ListReplacer(content, separator));
            return this;
        }

        public string FormatContent()
        {
            var ta = AssetDatabase.LoadAssetAtPath<TextAsset>(mAssetPath);
            var contentSb = new StringBuilder();
            var placeholderSb = new StringBuilder();
            foreach (var c in ta.text)
            {
                if (c == '#')
                {
                    if (placeholderSb.Length == 0)
                    {
                        placeholderSb.Append(c);
                    }
                    else
                    {
                        placeholderSb.Append(c);
                        //TODO Replace
                        var placeholder = placeholderSb.ToString();
                        if (!mReplacer.TryGetValue(placeholder, out var replacer))
                        {
                            throw new KeyNotFoundException($"placeholder {placeholder} not found");
                        }

                        for (int i = 0; i < replacer.Count; i++)
                        {
                            if (i > 0)
                            {
                                contentSb.Append(replacer.Separator);
                            }

                            contentSb.Append(replacer[i]);
                        }

                        placeholderSb.Clear();
                    }
                }
                else if (placeholderSb.Length > 0)
                {
                    placeholderSb.Append(c);
                }
                else
                {
                    contentSb.Append(c);
                }
            }

            if (placeholderSb.Length > 0)
            {
                throw new Exception($"file finished unexpectedly, no close $ found for {placeholderSb.ToString()}");
            }

            return contentSb.ToString();
        }
    }
}