let fs = require("fs");
let path = require("path");

module.exports.view = function () {
    let src = arguments[0], mode = arguments[1];
    // console.log(mode);
    if (mode === '-t') {
        callView(src, "");
    }
    else {
        callFlatView(src);
    }
    console.log("View Successful");
}

function checkForChild(src) {
    //returns all the children in the file
    let children = fs.readdirSync(src);
    return children;
}

function checkWhetherFile(src) {
    //checks if this is file or not?
    return fs.lstatSync(src).isFile();
}

function callView(src, indent) {
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        console.log(indent + path.basename(src) + "*");
    }
    else {
        console.log(indent + path.basename(src));
        let children = checkForChild(src);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            callView(childPath, indent + "\t");
        }
    }
}

function callFlatView(src) {
    let isFile = checkWhetherFile(src);
    if (isFile == true) {
        console.log(path.basename(src) + "*");
    }
    else {
        console.log(path.basename(src));
        let children = checkForChild(src);
        for (let i = 0; i < children.length; i++) {
            let childPath = path.join(src, children[i]);
            callFlatView(childPath);
        }
    }
}