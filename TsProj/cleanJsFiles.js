const fs = require("fs")

function clearDirectory(path) {
    // delete
    fs.rmSync(path, {recursive: true});
// create
    fs.mkdirSync(path);
}

console.log("Cleaning working tree...");

clearDirectory("./output")
clearDirectory("../Assets/Resources/TsScripts")

console.log("Successfully cleaned working tree!");