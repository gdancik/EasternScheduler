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
	alert("In toggleAllSchedules");
	var crnArray = [];
    var allTables = document.getElementsByTagName("table");
    var firstTable = allTables[0];
    for (var i = 1; i < firstTable.rows.length; i++) {
    	var x = document.getElementById(value).value;
		var rowid = value.replace("mySelect", "row"); 
	    var x = document.getElementById(rowid).value;
	    if (x === "Exclude") {
	        crnArray.push(firstTable.rows[i].cells[1].innerHTML);
	    }        
    }
    for (var i = 1; i < allTables.length; i++) {
        toggleSchedule(allTables[i], crnArray);
    }
}

f4 = function toggleSchedule(table, crnArray) {
	alert("In toggleSchedule");
	divs = document.getElementByTagName('div');  //Error here
	alert("Test");
    for (var i = 1; i < table.rows.length; i++) {
        var row = table.rows[i];
        var crn = row.cells[0].innerHTML;
        for (var j = 0; j < crnArray.length; j++) {
            if (crn === crnArray[j]) {
                divs[i].style.display = 'none';
                return;
            }
        }
        divs[i].style.display = 'block';
    }       
}