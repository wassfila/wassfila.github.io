	function myFunction() {
		var w = window.outerWidth - 200;
		var h = window.outerHeight - 150;
		var txt = "w " + w + ", h " + h + " ; ";
		
		var iw = h * 4 / 3;
		//w = h * 4 / 3;
		if (iw > w)//then iw is only ideal and cannot fit, so take w
		{
			h = w * 3 / 4;
			txt = txt + "iw>w ";
		}else//iw is good
		{
			w = iw;
			txt = txt + "iw<=w ";
		}
		txt = txt + "Window size: width=" + w + ", height=" + h;
		document.getElementById("F1").height = h;
		document.getElementById("F1").width = w;
		document.getElementById("F2").height = h;
		document.getElementById("F2").width = w;
		document.getElementById("demo").innerHTML = txt;
	}
