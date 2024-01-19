const fs = require("fs");
const path = require("path");
const process = require("process");
const targetDir = path.join(process.cwd(), "dist")
function getDirentFullPath(dirent) {
    return path.join(dirent.path, dirent.name);
}
function* walkDir(dir) {
    for (const dirent of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = getDirentFullPath(dirent);
        if (dirent.isDirectory()) {
            yield* walkDir(fullPath);
        } else {
            yield fullPath;
        }
    }
}

const reg = /\.js(\.map)?$/
for (const fileFullPath of walkDir(targetDir)) {
    fileFullPath.match(reg) && fs.renameSync(fileFullPath, fileFullPath.replace(/\.js(\.map)?$/, ".mjs$1"))
}