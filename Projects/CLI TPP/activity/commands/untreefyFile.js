let fs = require("fs");
let path = require("path");
let uniqid = require('uniqid');

function checkForFile(src_string) {
    return fs.lstatSync(src_string).isFile();
}

function childRead(src) {
    let children = fs.readdirSync(src);
    return children;
}

function untreefyLogic(src, dest, obj) {
    let isFile = checkForFile(src);
    if(isFile == true){
        let newName = uniqid();
        let oldName = path.basename(src);
        fs.copyFileSync(src, path.join(dest, newName));
        obj.newName = newName;
        obj.oldName = oldName;
        obj.isFile = true;
    }
    else{
        let dirName = path.basename(src);
        
        obj.isFile = false;
        obj.name = dirName;
        obj.children = [];

        let children = childRead(src);

        for(let i = 0; i < children.length; i++){
            let childPath = path.join(src, children[i]);
            let chobj = {};
            untreefyLogic(childPath, dest, chobj);
            obj.children.push(chobj); 
        }
    }
}

module.exports.untreefy = function () {
    let src = arguments[0], dest = arguments[1];
    let root = {};
    untreefyLogic(src, dest, root);
    console.log("Execution of UnTreefy Successful");
    fs.writeFileSync(path.join(dest,"metadata.json"),JSON.stringify(root))
}