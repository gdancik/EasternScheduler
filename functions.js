// functions.js - classes and functions used by schedule.js


/************************************************************
 * Course object used to store course information
 * c1 = new Course("CSC", "210", ["M","W","F"], 
 *          {"start": [9,9,9], "end:[9.83, 9.83, 9.83]})
 ************************************************************/
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
        
	}
}


/************************************************************
 * convertTime: converts time 'x' of form 'hh:mm am/pm' into 
 * military/decimal form, ex: 2:15 pm --> 14.25
 ***********************************************************/
function convertTime(x) {

   // split x into min and hour
	x = x.split(":");
	var hour = x[0];
    var min = x[1];

    var PM = min.search("pm") > 0;
    hour = parseInt(hour);
    min = parseInt(min);

    // convert to military time
    if (hour < 12 && PM ) {
        hour += 12;
    } else if (hour == 12 && !PM) {
        hour -= 12;
    }
	min = min/60;
    return hour + min;
}

