// This script highlights all occurences of 'qry'. The variable 'qry' should
// be set before calling this script

// alert("in highlight.js");

Course = class {
    constructor(Subj, Crse, days, times) {
        this.Subj = Subj;
		this.Crse = Crse;
        this.days = days;
        this.times = times;
    }
    print() {
		 // get unique starting and ending times
        var starts = Array.from(new Set(this.times['start']));
        var ends = Array.from(new Set(this.times['end']));
        if (starts.length == 1 && ends.length == 1) {
            console.log(this.Subj + "-" + this.Crse + ", " + this.days.join("") + " " + 
                    starts[0] + "-" + ends[0]);
        } else {
            console.log(this.Subj + "-" + this.Crse + ", days/times vary");
        }
        console.log();
    }
};


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

var commaCheck = ((qry.length - qry.replace(/,/g, "").length)+1);

//alert("You've got " + commaCheck + " courses"); 
/*
checks the amount of commas and adds one to represent the amount of courses if you would like
a variable amount of course inputs*/

var courseSet = [];

var inputCourse = qry.split(", ");

for (var i=0; i < commaCheck; i++){
	courseSet[i] = inputCourse[i];
}

/*
This is if you have a set number of inputs you would like

var x = inputCourse[0];
var y = inputCourse[1];
var z = inputCourse[2];*/

var classCourse = [];

var classTimes = [commaCheck][2];

for (var i = 0; i <commaCheck; i++){
	classSet = courseSet[i].split(" ");
	console.log("got: " + classSet[0] + ", " + classSet[1]);
	classCourse[i] = new Array(2);
	classCourse[i][0] = classSet[0];
	classCourse[i][1] = classSet[1];
}
	
/*
var xClassCourse = x.split(" ");
var xSubj = xClassCourse[0];
var xCrse = xClassCourse[1];

var yClassCourse = y.split(" ");
var ySubj = yClassCourse[0];
var yCrse = yClassCourse[1];

var zClassCourse = z.split(" ");
var zSubj = zClassCourse[0];
var zCrse = zClassCourse[1];*/

var COURSES = [];
var COURSE_NUM = 0;

// start at 4th table (index 3) stop at 2nd to last table
for (tableIndex = 3; tableIndex < html.length-1; tableIndex++) {
  var table = html[tableIndex];  // index 14 is CS
  var rows = table.rows;

  for (var i = 3; i < rows.length; i++) {
	  
	for(var j = 0; j < commaCheck; j++){
	    
		
		if (rows[i].cells[3].innerText == classCourse[j][0] && rows[i].cells[4].innerText == classCourse[j][1]) {
		var subj = rows[i].cells[3].innerText;
		var crse = rows[i].cells[4].innerText;
		var dys = rows[i].cells[10].innerText;
		var tme = rows[i].cells[11].innerText;
		// do something similar to pull out the days/times

		//console.log("Course: " + subj + "-" + crse + "  Days: " + dys + "  Time: " + tme);
		

		var timeTable = tme.split("-");
			
		var course1 = new Course(subj, crse, dys.split(""), 
		       {"start": timeTable[0], "end": timeTable[1]} );
		
		COURSES[COURSE_NUM] = course1;
		COURSE_NUM++;
			
		} // end if statement
		
	} //end inner inner for loop
	  
  } // end inner for loop
	
} // end  outer for loop


console.log("COURSES FOUND: " + COURSE_NUM);
for (var i = 0; i < COURSE_NUM; i++) {
	COURSES[i].print(i);
}


var newWindow = window.open("", null);
newWindow.document.write("<h1> This is a new page </h1>");
newWindow.document.write("<p style=\"color:red\"> This is a new page </p>");
newWindow.document.write("<p> This is a new page </p>");

function writeParagraph(w, txt) {
	var s = "<p>" + txt + "</p>";
	w.document.write(s);
}

writeParagraph(newWindow, "This is a test");
writeParagraph(newWindow, "This is not a test");





