using UnityEngine;

namespace UITween
{
    public interface ITargetTypeLimit
    {
        public Component Target { get; }
        public System.Type[] ValidTargetTypes { get; }
    }
}