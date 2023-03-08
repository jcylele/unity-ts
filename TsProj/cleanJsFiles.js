const fs = require("fs")

function clearDirectory(path) {
    // delete
    fs.rmdirSync(path, {recursive: true});
// create
    fs.mkdirSync(path);
}

console.log("Cleaning working tree...");

clearDirectory("./output")
clearDirectory("../Assets/Resources/TsScripts")

console.log("Successfully cleaned working tree!");