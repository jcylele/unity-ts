using System.IO;
using Puerts;
using UnityEngine;

namespace TS
{
    public class TsLoader : ILoader, IModuleChecker
    {
        private string ResourcePath(string path, out string debugpath)
        {
            var fullPath = path.StartsWith("puerts") ? path : Path.Combine("TsScripts", path);
            debugpath = fullPath;

            var dotIndex = fullPath.LastIndexOf('.');
            return dotIndex == -1 ? fullPath : fullPath.Substring(0, dotIndex);
        }

        public bool FileExists(string filepath)
        {
            var resourcePath = this.ResourcePath(filepath, out _);
            return Resources.Load<TextAsset>(resourcePath) != null;
        }

        public string ReadFile(string filepath, out string debugpath)
        {
            string resourcePath = this.ResourcePath(filepath, out debugpath);
            var file = Resources.Load<TextAsset>(resourcePath);
            return file != null ? file.text : null;
        }

        public bool IsESM(string filepath)
        {
            return !filepath.EndsWith(".cjs");
        }
    }
}