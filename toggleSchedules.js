f = function resetSelection() {
	var tables = document.getElementsByTagName("table");
    var t1 = tables[0];
    for (var i = 1; i < t1.rows.length; i++) {
        var row = t1.rows[i];
                   
        //reset class name, but preserve 'evenRow' if present
        //var className = document.getElementById(row.id).className;
        var className = row.className;
        
        if (className.indexOf("evenRow") >= 0) {
        	className = "evenRow noselection";
        } else {
        	className = "noselection"
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
}