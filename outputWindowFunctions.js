
// outputs Courses Found table to newWindow
function printCoursesFound(newWindow, COURSES, COURSE_NUM) {

    // output headers
	newWindow.document.write("<h1> Courses Found </h1>");

	newWindow.document.write("<button onclick='resetSelection();'" +
        "style = 'padding: 5px; width: 200px;" +
        "background-color: indianred;color: white;border-radius:8px'>" +
        "Reset class filters</button></br></br>")

	newWindow.document.write("<table>");
	newWindow.document.write("<tr>");
	newWindow.document.write("<th>Selection</th>");
	newWindow.document.write("<th>CRN</th>");
	newWindow.document.write("<th>Subj</th>");
	newWindow.document.write("<th>Crse</th>");
	newWindow.document.write("<th>Sec</th>");
	newWindow.document.write("<th>Title</th>");
	newWindow.document.write("<th>Instructor</th>");
	newWindow.document.write("<th>Days</th>");
	newWindow.document.write("<th>Time</th>");
	newWindow.document.write("</tr>");


	// output courses that are found
	for (var i = 0; i < COURSE_NUM; i++) {
	
    	// add a 'blank' line between courses
    	if (i> 0 && (COURSES[i].Subj != COURSES[i-1].Subj || COURSES[i].Crse != COURSES[i-1].Crse)) {
        	newWindow.document.write("<tr style = 'background-color: black'><td colspan=9 style='padding:2'> </td></tr>");
    	}

		writeCourse(newWindow, COURSES[i], i)
	}
	
	newWindow.document.write("</table>");
	newWindow.document.write("<br/>");
}


// write course information -- used to output list of all courses
function writeCourse(newWindow, c, i) {

	for (var r = 0; r < c.strDays.length; r++) {

		//newWindow.document.write("<td> Selection here </td>");

		//This will alternate the color of the table rows for easier readability
		if (i % 2 == 0){
			newWindow.document.write("<tr class=\"evenRow\" id= row"+COURSES[i].CRN+">");
		} else {
			newWindow.document.write("<tr class=\"oddRow\" id= row"+COURSES[i].CRN+">");
		}

		//<select id="mySelect1" onchange = "dropDownChange(this.id, 'row01', 'crn01')">

		// output course info, but if multi-row we only output days/times
		if (r == 0) { // print out first row for course
		
			newWindow.document.write("<td>");
			newWindow.document.write("<select id='mySelect"+COURSES[i].CRN+"' onchange='dropDownChange(this.id)'>");
			newWindow.document.write("<option value='No selection'>No selection</option>");
			newWindow.document.write("<option value='Include'>Include</option>");
			newWindow.document.write("<option value='Exclude'>Exclude</option>");
			newWindow.document.write("</select>");			
			newWindow.document.write("</td>");
			newWindow.document.write("<td>"+COURSES[i].CRN+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Subj+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Crse+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Sec+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Title+"</td>");
			newWindow.document.write("<td>"+COURSES[i].Instructor+"</td>");
		} else { // print out additional rows
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
			newWindow.document.write("<td>"+"</td>");
		}

		// output days and times
		newWindow.document.write("<td>"+COURSES[i].strDays[r]+"</td>");
    	newWindow.document.write("<td>"+COURSES[i].strTimes[r]+"</td>");
		newWindow.document.write("</tr>");
        
    }  
}


// outputs a single schedule to the window
function printSchedule(newWindow, scheduleNum, schedule1) {

		newWindow.document.write("<div>\n");
        	
        newWindow.document.write("<h3 style = 'display:inline;'>Schedule " + scheduleNum + "</h3>");       
		newWindow.document.write("<table border = 1 style='border-collapse:collapse' width='80%'>");

        //  output heading, CRN, Subj, Crse
        newWindow.document.write("<tr>")
        newWindow.document.write("<th width = '5%'>CRN</th>")
        newWindow.document.write("<th width = '5%'>Subject</th>")
        newWindow.document.write("<th width = '10%'>Crse</th>")
        newWindow.document.write("<th width = '10%'>Sec</th>")
        newWindow.document.write("<th width = '30%'>Title</th>")
		newWindow.document.write("<th width = '15%'>Instructor</th>")
		
        newWindow.document.write("<th width = '5%'>Day</th>");
        newWindow.document.write("<th width = '20%'>Time</th>");
        newWindow.document.write("</tr>")
            
       	for (var s = 0; s < schedule1.length; s++) {
             
           	var c = schedule1[s];           
	        console.log(c.Subj + " " + c.Crse + " " + c.strDays + c.strTimes);                      
            newWindow.document.write("<tr>");
            newWindow.document.write("<td>" + c.CRN +"</td>");
            newWindow.document.write("<td>" + c.Subj+"</td>");
            newWindow.document.write("<td>" + c.Crse+"</td>");
            newWindow.document.write("<td>" + c.Sec+"</td>");
            newWindow.document.write("<td>" + c.Title+"</td>");
			newWindow.document.write("<td>" + c.Instructor+"</td>");
	
            var days = c.strDays.toString();
            days = days.replace(",","<br>");
            newWindow.document.write("<td>" + days +"</td>");

            var times = c.strTimes.toString();
            times = times.replace(",","<br>");
            newWindow.document.write("<td>" + times+"</td>");
            newWindow.document.write("</tr>");
                   
       	}
    
    	newWindow.document.write("</table>");        
        newWindow.document.write("<br>");     
    	newWindow.document.write("</div>");        
}
