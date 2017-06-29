function hello(input) {
    window.close();
    codeString = "var qry = \"" + input.value + "\";";
    //codeString = "qry=3;";
    chrome.tabs.executeScript(null, {code: codeString});
    chrome.tabs.executeScript(null, {file: "highlight.js"});
}


// Add listener for button click, which calls 'hello'
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById("btnHighlight").addEventListener("click", 
        function() {hello(document.getElementById('searchString'));})
});

