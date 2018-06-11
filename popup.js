function findSchedules(input) {
    window.close();
    codeString = "var qry = \"" + input.value + "\";";
    //codeString = "qry=3;";
    chrome.tabs.executeScript(null, {code: codeString});
    chrome.tabs.executeScript(null, {file: "functions.js"});
    chrome.tabs.executeScript(null, {file: "outputWindowFunctions.js"});
    chrome.tabs.executeScript(null, {file: "schedule.js"});
}

// Add listener for button click, which calls 'findSchedules'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnFindSchedules").addEventListener("click", 
        function() {findSchedules(document.getElementById('searchString'));})
});

