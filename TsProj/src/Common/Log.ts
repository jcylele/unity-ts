import Debug = CS.UnityEngine.Debug

function ToString(obj: any): string {
    return `[ts] ${obj}`
}

export function Info(obj: any) {
    Debug.Log(ToString(obj))
}

export function Warn(obj: any) {
    Debug.LogWarning(ToString(obj))
}

export function Error(obj: any) {
    Debug.LogError(ToString(obj))
}

export function InfoJson(obj: any) {
    const str = JSON.stringify(obj)
    Info(str)
}