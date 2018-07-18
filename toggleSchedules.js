f = function resetSelection() {
	var tables = document.getElementsByTagName("table");
    var t1 = tables[0];
    for (var i = 1; i < t1.rows.length; i++) {
        var row = t1.rows[i];
                   
        //reset class name, but preserve 'evenRow' if present
        //var className = document.getElementById(row.id).className;
        var className = row.className;
        
        if (className.indexOf("evenRow") >= 0) {
        	className = "evenRow";
        } else {
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
        
        //showing all tables
        //for some reason when this for loop is run, the whole extension seems to crash
        //for(var i = 1; i < tables.length; i ++) {
        	//divs[i].style.display = 'block';
        //}                 
    }
}

f2 = function dropDownChange(value) {
	var x = document.getElementById(value).value;
	//alert("select id: " + value + "\nrowid: " + rowid);
	var rowid = value.replace("mySelect", "row");
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
		
		styleOtherCourses(rowid, "include", value);
		
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
		
		styleOtherCourses(rowid, "exclude", value);
		
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
		
		styleOtherCourses(rowid, "no selection", value);
		
	}
	
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
	        	alert("crnArray: " + crnArray);
	    	}
	    }        
    }
    for (var x = 1; x < allTables.length; x++) {
    	//alert("table: " + x);
        toggleSchedule(allTables[x], x, crnArray);
    }
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
            	alert("Match found in crn\n i: "  + i);
                divs[table_ind].style.display = 'none';
                return;
            }
        }
        divs[table_ind].style.display = 'block';
    }       
}

f5 = function styleOtherCourses(rowId, selectedType, value) {
	alert("in styleOtherCourses");
	var row = document.getElementById(rowId)
    var selectedCourse = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
    var allTables = document.getElementsByTagName("table");
    var firstTable = allTables[0];
    for (var i = 1; i < firstTable.rows.length; i++) {
        row = firstTable.rows[i];
        var dropDown = row.cells[0].children[0];
        // get the course (e.g., CSC-210)
        
        //alerts 1 and 2 to show where/when the error occurs
        alert("1");
        if (dropDown != undefined) {
        	var course = row.cells[2].innerHTML + "-" + row.cells[3].innerHTML;
        }
        alert("2");
        
        // if this course matches the selected course (and has a different
        // row id)
        if (selectedCourse == course && row.id != rowId) {
            // get id of corresponding dropdown (this works because ids are
            // of the form "mySelect#" where # is the crn
            var crn = row.cells[1].innerHTML;
            var selectId = "mySelect" + crn;
            // if user has included a course, exclude and disable the others
            if (selectedType === "include" && document.getElementById(row.id).className === "evenRow include") {
                document.getElementById(row.id).className = "evenRow exclude";
                document.getElementById(value).value = "Exclude";
                document.getElementById(value).disabled = true;
            } 
            else if (selectedType === "include" && document.getElementById(row.id).className === "oddRow include") {
            	document.getElementById(row.id).className = "oddRow exclude";
                document.getElementById(value).value = "Exclude";
                document.getElementById(value).disabled = true;
            }
            else { // otherwise, just enable the drop downs
                document.getElementById(value).disabled = false;
            }
        }
    }  
}





