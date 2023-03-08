export function Info(obj: any) {
    console.log(obj)
}

export function Warn(obj: any) {
    console.warn(obj)
}

export function Error(obj: any) {
    console.error(obj)
}

export function InfoJson(obj: any) {
    const str = JSON.stringify(obj)
    Info(str)
}