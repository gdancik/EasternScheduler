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
var html = document.getElementsByTagName('table');


// modify the below to only print out the information for matching
// courses


var inputCourse = qry.split(" ");
var x = inputCourse[0];
var y = inputCourse[1];

console.log("x = " + x);
console.log("y = " + y);

// start at 4th table (index 3) stop at 2nd to last table
for (tableIndex = 3; tableIndex < html.length-1; tableIndex++) {
  var table = html[tableIndex];  // index 14 is CS
  var rows = table.rows;

  for (i = 3; i < rows.length; i++) {
	if (rows[i].cells[3].innerText == x && rows[i].cells[4].innerText == y) {
		var subj = rows[i].cells[3].innerText;
		var crse = rows[i].cells[4].innerText;
		var dys = rows[i].cells[11].innerText;
		var tme = rows[i].cells[12].innerText;
		// do something similar to pull out the days/times


		console.log("Course: " + subj + "-" + crse + "  Days: " + dys + "  Time: " + tme);
		
	}
  }
}

/*
for (i = 0; i < rows.length; i++) {
	if (rows[i].cells.length > 5) {
		var subj = rows[i].cells[3].innerText;
		var crse = rows[i].cells[4].innerText;
		// do something similar to pull out the days/times
		console.log("Course: " + subj + "-" + crse);
		
	}
}

*/
/*for (i = 0; i < html.length; i++) {
	if (qry == html[i].cells[3].innerHTML) {
		//var x = html[i].cells[3].innerHTML;
		//var y = html[i].cells[10].innerHTML;
		console.log("yo");
	}
}*/

//  change HTML so word is highlighted
//var findWord = RegExp(qry, "g"); // will replace all occurences 

//var replaceWord = "<span style='color:red'>" + qry + "</span>"
//text = text.replace(findWord, replaceWord);

// reset the inner HTML of the body
//document.getElementsByTagName('table')[0].innerHTML = text;



//1. Have the user enter a course number CSC 210 for example
//2. When Highlihgt is clicked it will output the course information
//3. 