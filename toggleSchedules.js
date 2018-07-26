f0 = function highlightConflicts() {

    // TO DO: get row ids for courses that are not in any schedule

    // TO DO: for each row id, replace dropdown with CONFLICT and set className to exlcude
    // (an example for "row10206" is below
    row = document.getElementById("row10206");
    row.cells[0].innerHTML = "<td>CONFLICT</td>";
    row.className = "exclude";

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
        
	}
	        
        //showing all tables
        //for some reason when this for loop is run, the whole extension seems to crash
        for(var i = 1; i < tables.length; i ++) {
        	divs[i].style.display = 'block';
        }

        formatMultiRowCourses()
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
    for (var x = 1; x < allTables.length; x++) {
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
                divs[table_ind].style.display = 'none';
                return;
            }
        }
        divs[table_ind].style.display = 'block';
    }       
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


