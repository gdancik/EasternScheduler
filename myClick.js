
var f = "earlyCount = 1;\nfunction myClick() {" +

	"alert('in myClick');" + 
	"tables = newWindow.document.getElementByClass('early')" +
	
	

	"if (earlyCount%2 == 1){" +
		
	"	for (var i = 0; i < tables.length; i++) {" +
	"		tables[i].style.display = 'none';" +
	"	}" +
		
		"newWindow.document.getElementById('b1').innerText = 'Click me to show';" +

	"}else{" +
	" for (var i = 0; i < tables.length; i++) {" +
	"		tables[i].style.display = 'table';" +
	"	}" +

		"newWindow.document.getElementById('b1').innerText = 'Click me to hide';"

	"}" +
	"earlyCount = earlyCount + 1;" +
"}";
