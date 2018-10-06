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

function getCurrentTabUrl(callback) {  
  var queryInfo = {
    active: true, 
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    var tab = tabs[0]; 
    var url = tab.url;
    callback(url);
  });
}


// Add listener for button click, which calls 'findSchedules'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnFindSchedules").addEventListener("click", 
        function() {
        
            getCurrentTabUrl(function(url) {
                if (url.indexOf("easternct\.edu") > 0) {
                    findSchedules(document.getElementById('searchString'));
                } else {
                    alert("To use this extension, first perform a class search at Eastern's Schedule of Classes page (see Step 1)");
                }
            })
     });
});

