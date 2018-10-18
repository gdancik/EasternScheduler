f0 = function highlightConflicts() {
    // get row ids for courses that are not in any schedule
	var tables = document.getElementsByTagName("table");
    var t1 = tables[0];
    var rowIdArray = [];
    for (var i = 1; i < t1.rows.length; i++) {				//check first table
        var bool = true;
    	var row = t1.rows[i];
    	var dropDown = row.cells[0].children[0];
    	if (dropDown != undefined) {
    		var crn = row.cells[1].innerHTML;
    	}
    	
    	for (var j = 1; j < tables.length; j++) {			//check all schedules
    			var table = tables[j];
    		for (var k = 1; k < table.rows.length; k++) {		//check row of each schedule
    			var scheduleRow = table.rows[k];
    			if (scheduleRow != undefined) {
    				var scheduleCrn = scheduleRow.cells[0].innerHTML;  
    			}
                //alert("crn = " + crn + " and scheduleCrn = " + scheduleCrn);
    			if (crn === scheduleCrn) {
    				bool = false;
    			}  		
    		}
    	}
    	if (bool === true) {	//crn not found in any schedules
    		var rowId = "row" + crn;
    		rowIdArray.push(rowId);
    		//alert("rowIdArray: " + rowIdArray);
    	}
    }
	
	
    // for each row id, replace dropdown with CONFLICT and set className to exlcude
	for (var i = 0; i < rowIdArray.length; i++) {
		var row = document.getElementById(rowIdArray[i]);
		row.cells[0].innerHTML = "<td>CONFLICT</td>";
		row.className = "exclude";
	}

    // check whether any courses have only one section available
    //
    // get tally of each course
    var courseCounts = {};
    for (var i = 1; i < t1.rows.length; i++) {
        var r = t1.rows[i];
        if (r.cells.length>=3) {
            var course = r.cells[2].innerHTML + r.cells[3].innerHTML;
            if (course == "") {
                continue;
            }
            if (course in courseCounts) {
                courseCounts[course] += 1;
            } else {
                courseCounts[course] = 1;
            }
        } 
    }
   
    // which courses have one section
    oneCourseList = []
    for (var c in courseCounts) {
        if (courseCounts[c] == 1) {
            oneCourseList.push(c);
        }
    }

    // change formatting of single section courses
    for (var i = 1; i < t1.rows.length; i++) {
        var r = t1.rows[i];
        if (r.cells.length>=3) {
            var course = r.cells[2].innerHTML + r.cells[3].innerHTML;
            if (oneCourseList.indexOf(course) >= 0 ) {
                if (r.cells[0].innerHTML.indexOf("CONFLICT") < 0) {
		            r.cells[0].innerHTML = "<td>REQUIRED</td>";
		            r.className = "include";
                }
            }
        }
    }

    // display message to user
    var msg = "";

    if (rowIdArray.length>0) {
        msg = msg + "\nAt least one course is excluded from all schedules because of a time conflict with other courses."; 
    }
    if (oneCourseList.length>0) {
        msg = msg + "\n\nAt least one course has only one section. This section is required and will appear in all schedules";
    }
    
    if (msg != "") {
        alert("Note:\n" + msg);
    }

        formatMultiRowCourses();
}

f = function resetSelection() {
	var tables = document.getElementsByTagName("table");
    var t1 = tables[0];
    for (var i = 1; i < t1.rows.length; i++) {
        var row = t1.rows[i];
                   
        //reset class name, but preserve 'evenRow' if present
        //var className = document.getElementById(row.id).className;
        var className = row.className;
        
        if (className === "exclude" || className === "include") {
        	//do nothing
        }
        else if (className.indexOf("evenRow") >= 0) {
        	className = "evenRow";
        } 
        else {
        	className = "oddRow"
        }
        
        row.className = className; 
        
        //update drop down
	    dropdown = row.cells[0].children[0];
    
    	if (dropdown == undefined) {
    		continue;
    	}
    
        dropdown.value = "No selection";
        dropdown.disabled = false;       
        
	}
	        
        //showing all tables
        for(var i = 1; i < tables.length; i ++) {
        	divs[i].style.display = 'block';
        }

        formatMultiRowCourses()

        var a = document.getElementById("available");
        a.innerHTML = "Available Schedules (" + (tables.length-1) + " available)";

}

f2 = function dropDownChange(value) {
	var x = document.getElementById(value).value;
	//alert("select id: " + value + "\nrowid: " + rowid);
	var rowid = value.replace("mySelect", "row");
	//alert("rowid: " + rowid);
	if (x === "Include") {
		var rowClass = document.getElementById(rowid).className;
		if (rowClass === "evenRow") {
			document.getElementById(rowid).className = "evenRow include";
		}
		else if (rowClass === "evenRow exclude") {
			document.getElementById(rowid).className = "evenRow include";
		}
		else if (rowClass === "oddRow") {
			document.getElementById(rowid).className = "oddRow include";
		}
		else if (rowClass === "oddRow exclude") {
			document.getElementById(rowid).className = "oddRow include";
		}
		
		styleOtherCourses(rowid, "include");
		checkExclusions(value, rowid, "include");
		
	}
	if (x === "Exclude") {
		var rowClass = document.getElementById(rowid).className;
		if (rowClass === "evenRow") {
			document.getElementById(rowid).className = "evenRow exclude";
		}
		else if (rowClass === "evenRow include") {
			document.getElementById(rowid).className = "evenRow exclude";
		}
		else if (rowClass === "oddRow") {
			document.getElementById(rowid).className = "oddRow exclude";
		}
		else if (rowClass === "oddRow include") {
			document.getElementById(rowid).className = "oddRow exclude";
		}
		
		styleOtherCourses(rowid, "exclude");
		checkExclusions(value, rowid, "exclude");
		
	}
	if (x === "No selection") {
		var rowClass = document.getElementById(rowid).className;
		if (rowClass === "evenRow include") {
			document.getElementById(rowid).className = "evenRow";
		}
		else if (rowClass === "evenRow exclude") {
			document.getElementById(rowid).className = "evenRow";
		}
		else if (rowClass === "oddRow include") {
			document.getElementById(rowid).className = "oddRow";
		}
		else if (rowClass === "oddRow exclude") {
			document.getElementById(rowid).className = "oddRow";
		}
		
		styleOtherCourses(rowid, "no selection");
		checkExclusions(value, rowid, "no selection");
		
	}

    formatMultiRowCourses();
	toggleAllSchedules(value);
}

f3 = function toggleAllSchedules(value) {
	var crnArray = [];
    var allTables = document.getElementsByTagName("table");
    var firstTable = allTables[0];
    for (var i = 1; i < firstTable.rows.length; i++) {
    	var row = firstTable.rows[i];
    	var dropDown = row.cells[0].children[0];
	    if (dropDown != undefined) {
	    	dropDown = row.cells[0].children[0].value;
	    	if (dropDown === "Exclude") {
	        	crnArray.push(firstTable.rows[i].cells[1].innerHTML);
	    	}
	    }        
    }
    var num = 0;
    for (var x = 1; x < allTables.length; x++) {
        if (toggleSchedule(allTables[x], x, crnArray)) {
            num++;
        }
    }
//    alert("Number of schedules: " + num);
    var a = document.getElementById("available");
    a.innerHTML = "Available Schedules (" + num + " available)";
    

}

f4 = function toggleSchedule(table, table_ind, crnArray) {
	//alert("in toggleSchedule");
    
	divs = document.getElementsByTagName('div');
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var crn = row.cells[0].innerHTML;
        //alert("i: " + i + "\ncrn: " + crn);
        for (var j = 0; j < crnArray.length; j++) {
            if (crn === crnArray[j]) {
                divs[table_ind].style.display = 'none';
                return false;
            }
        }
        divs[table_ind].style.display = 'block';
    }      
    return true;
}

f5 = function styleOtherCourses(rowId, selectedType) {
	var row = document.getElementById(rowId);
    var selectedCourse = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
    var allTables = document.getElementsByTagName("table");
    var firstTable = allTables[0];
    for (var i = 1; i < firstTable.rows.length; i++) {
        row = firstTable.rows[i];
        var dropDown = row.cells[0].children[0];
        // get the course (e.g., CSC-210)
        
        if (dropDown != undefined) {
        	var course = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
        }
        else {
        	continue;
        }
        
        // if this course matches the selected course (and has a different
        // row id)
        if (selectedCourse === course && row.id != rowId) {
            // get id of corresponding dropdown (this works because ids are
            // of the form "mySelect#" where # is the crn
            var crn = row.cells[1].innerHTML;
            var selectId = "mySelect" + crn;
            //alert("exclude " + selectId +"\nclass: " + document.getElementById(row.id).className);
            //alert("selectId: " + selectId);
            // if user has included a course, exclude and disable the others
            if (selectedType === "include" && document.getElementById(row.id).className === "evenRow include") {
                document.getElementById(row.id).className = "evenRow exclude";
                document.getElementById(selectId).value = "Exclude";
                document.getElementById(selectId).disabled = true;
            } 
            if (selectedType === "include" && document.getElementById(row.id).className === "evenRow") {
                document.getElementById(row.id).className = "evenRow exclude";
                document.getElementById(selectId).value = "Exclude";
                document.getElementById(selectId).disabled = true;
            }
            if (selectedType === "include" && document.getElementById(row.id).className === "oddRow include") {
            	document.getElementById(row.id).className = "oddRow exclude";
                document.getElementById(selectId).value = "Exclude";
                document.getElementById(selectId).disabled = true;
            }
            if (selectedType === "include" && document.getElementById(row.id).className === "oddRow") {
            	document.getElementById(row.id).className = "oddRow exclude";
                document.getElementById(selectId).value = "Exclude";
                document.getElementById(selectId).disabled = true;
            } else if (selectedType === "include") {
                document.getElementById(selectId).disabled = true;
            } else { // otherwise, just enable the drop downs
                document.getElementById(selectId).disabled = false;
            }
        }
    }  
}

f6 = function checkExclusions(value, rowId, selectedType) {
	var x = document.getElementById(value).value;
    var allTables = document.getElementsByTagName("table");
    var firstTable = allTables[0];
	var row = document.getElementById(rowId);
    var selectedCourse = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
    var AllExcluded = true;
    var selectId = rowId;
    selectId = rowId.replace("row", "mySelect");
    if (x === "Include" || x === "No selection") {
    	//No possibility of incorrect exclusions
    }
    else if (x === "Exclude") {

    	for (var i = 1; i < firstTable.rows.length; i++) {
    		row = firstTable.rows[i];
    		var dropDown = row.cells[0].children[0];
    		if (dropDown != undefined) {
    			var course = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
    		} else {
                continue;
            }
    		if (selectedCourse === course && row.id != rowId) {
    			if (dropDown.value === "Include" || dropDown.value === "No selection") {
    				AllExcluded = false;
    			}
    		}
    	}
    	if (AllExcluded === true) {
    		alert("All sections of a course may not be excluded");
    		document.getElementById(selectId).value = "No selection";
    		if (document.getElementById(rowId).className === "oddRow exclude") {
    			document.getElementById(rowId).className = "oddRow";
    		}
    		else if (document.getElementById(rowId).className === "evenRow exclude") {
    			document.getElementById(rowId).className = "evenRow";
    		}	
    	}
    }
}

// in 2nd row of multi-row courses, set format of last 2 cells to format of previous row
// this is based on the fact that both rows have the same ID
f7 = function formatMultiRowCourses() {
    table = document.getElementsByTagName("table")[0];
    for (var i = 1; i < table.rows.length; i++) {
        row = table.rows[i];
        var row0 = table.rows[i-1];

        if (row.id == row0.id) {
            var n = row.cells.length-1;
            row.cells[n].className = row0.className;
            row.cells[n-1].className = row0.className;
        }
    }
}

