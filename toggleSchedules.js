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
            }
        }
        //divs[table_ind].style.display = 'block';
    }       
}