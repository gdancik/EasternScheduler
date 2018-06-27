f = function resetSelection() {
	alert("using toString");
	
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


