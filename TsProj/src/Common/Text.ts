import {LoadJson} from "../CsUtil";

let _allText: { [key: string]: string }

function Get(textId: string): string {
    if (!_allText) {
        _allText = LoadJson('Text')
    }
    return _allText[textId] || `ERROR(${textId})`
}

export function GetText(textId: string): string {
    return Get(textId)
}

export function FormatText(textId: string, ...args: any): string {
    const str = Get(textId);
    return str.replace(/{([0-9]+)}/g, function (match, index) {
        // check if the argument is present
        return typeof args[index] == 'undefined' ? match : args[index];
    });
}