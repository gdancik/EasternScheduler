// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

if (typeof(qry) == "undefined") {
    qry = "Connecticut";
} else if (qry == "" || qry == " ") {
    qry = "Connecticut";
}

//alert(" highlight.js with qry = " + qry);
console.log("highlighter is running with qry = " + qry + "...");

// get all HTML from the body
var html = document.getElementsByTagName('body')[0];
var text = html.innerHTML;

//  change HTML so word is highlighted
var findWord = RegExp(qry, "g"); // will replace all occurences 

var replaceWord = "<span style='color:red'>" + qry + "</span>"
text = text.replace(findWord, replaceWord);

// reset the inner HTML of the body
document.getElementsByTagName('body')[0].innerHTML = text;

console.log("done!");
