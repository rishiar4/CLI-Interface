let helpFile = require("./commands/help.js");
let treefyFile = require("./commands/treefyFile.js");
let untreefyFile = require("./commands/untreefyFile.js");
let viewFile = require("./commands/viewFile.js");

let input = process.argv.slice(2);

// treefy 
// untreefy
// view -t
// view -f
// help

let cmd = input[0];
// console.log(cmd);
switch(cmd){
    case "view":
        viewFile.view(input[1],input[2]);
        break;
    case "treefy":
        treefyFile.treefy(input[1], input[2]);
        break;
    case "untreefy":
        untreefyFile.untreefy(input[1], input[2]);
         break;
    case "help":
        helpFile.help();
        break;
    default:
        console.log("Wrong Command");
        break;
}