function findSchedules(input) {

    var x = input.value;
    x = x.replace("-", " ")
    x = x.replace(/\s+/g, " ")

    if (x == "" || x == " ") {
        alert("Please enter one or more courses to proceed");
        return;
    }

    coursePattern = RegExp("^([a-zA-Z]{3} [0-9]{3}, )*[a-zA-Z]{3} [0-9]{3}$");

    if (x.match(coursePattern) == null) {
        alert("Please enter your courses in the correct format.\n\n" +
            "Example: CSC 210, MAT 243, EES 112");
        return;
    }

    window.close();
    codeString = "var qry = \"" + x + "\";";

    chrome.tabs.executeScript(null, {code: codeString});
    chrome.tabs.executeScript(null, {file: "functions.js"});
    chrome.tabs.executeScript(null, {file: "toggleSchedules.js"});
    chrome.tabs.executeScript(null, {file: "outputWindowFunctions.js"});
    chrome.tabs.executeScript(null, {file: "schedule.js"});

}

// Add listener for button click, which calls 'findSchedules'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnFindSchedules").addEventListener("click", 
        function() {findSchedules(document.getElementById('searchString'));})
});

