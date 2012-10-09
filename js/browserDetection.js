var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
		this.version = this.searchVersion(navigator.userAgent)
			|| this.searchVersion(navigator.appVersion)
			|| "an unknown version";
		this.OS = this.searchString(this.dataOS) || "an unknown OS";
	},
	searchString: function (data) {
		for (var i=0;i<data.length;i++)	{
			var dataString = data[i].string;
			var dataProp = data[i].prop;
			this.versionSearchString = data[i].versionSearch || data[i].identity;
			if (dataString) {
				if (dataString.indexOf(data[i].subString) != -1)
					return data[i].identity;
			}
			else if (dataProp)
				return data[i].identity;
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index == -1) return;
		return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
	},
	dataBrowser: [
		{
			string: navigator.userAgent,
			subString: "Chrome",
			identity: "Chrome"
		},
		{ 	string: navigator.userAgent,
			subString: "OmniWeb",
			versionSearch: "OmniWeb/",
			identity: "OmniWeb"
		},
		{
			string: navigator.vendor,
			subString: "Apple",
			identity: "Safari",
			versionSearch: "Version"
		},
		{
			prop: window.opera,
			identity: "Opera",
			versionSearch: "Version"
		},
		{
			string: navigator.vendor,
			subString: "iCab",
			identity: "iCab"
		},
		{
			string: navigator.vendor,
			subString: "KDE",
			identity: "Konqueror"
		},
		{
			string: navigator.userAgent,
			subString: "Firefox",
			identity: "Firefox"
		},
		{
			string: navigator.vendor,
			subString: "Camino",
			identity: "Camino"
		},
		{		// for newer Netscapes (6+)
			string: navigator.userAgent,
			subString: "Netscape",
			identity: "Netscape"
		},
		{
			string: navigator.userAgent,
			subString: "MSIE",
			identity: "Explorer",
			versionSearch: "MSIE"
		},
		{
			string: navigator.userAgent,
			subString: "Gecko",
			identity: "Mozilla",
			versionSearch: "rv"
		},
		{ 		// for older Netscapes (4-)
			string: navigator.userAgent,
			subString: "Mozilla",
			identity: "Netscape",
			versionSearch: "Mozilla"
		}
	],
	dataOS : [
		{
			string: navigator.platform,
			subString: "Win",
			identity: "Windows"
		},
		{
			string: navigator.platform,
			subString: "Mac",
			identity: "Mac"
		},
		{
			   string: navigator.userAgent,
			   subString: "iPhone",
			   identity: "iPhone/iPod"
	    },
		{
			string: navigator.userAgent,
			subString: "Android",
			identity: "Android"
		},
		{
			string: navigator.platform,
			subString: "Linux",
			identity: "Linux"
		}
	]

};

function writeCookie(name,value,days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        expires = "; expires=" + date.toGMTString();
            }else{
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var i, c, ca, nameEQ = name + "=";
    ca = document.cookie.split(';');
    for(i=0;i < ca.length;i++) {
        c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return '';
}

function printBrowserWarning ()
{
	if (BrowserDetect.browser == "Chrome" )
	{
		//document.write("You are using " + BrowserDetect.browser + " " + BrowserDetect.version + " on " + BrowserDetect.OS + ".<br />");
	}
	else
	{
		var hxlNoWarning = 'hxlNoWarning';
		var notify = !readCookie(hxlNoWarning);
		if (notify) 
		{
			if (BrowserDetect.browser == "Firefox")
			{
				document.write("<div id='broCheck' class='alert alert-block' style='display: block;' >");
				document.write("This prototype system doesn't work well on all browsers. Most things here work in Firefox, but we recommend you view it in <a href='http://www.google.com/chrome' target=\"_blank\" >Chrome</a>.");
				document.write("<a class='close' href='#' onclick='document.getElementById(\"broCheck\").style.display=\"none\"; writeCookie(\"hxlNoWarning\", true, 1);' >X</a></div>");
			}
			else
			{
				document.write("<div id='broCheck' class='alert alert-block' style='display: block;' >");
				document.write("This prototype system doesn't work well on all browsers. We recommend <a href='http://www.google.com/chrome' target=\"_blank\" >Chrome</a> for viewing this site. Most things will work well in <a href='http://www.mozilla.org/en-US/firefox/new/' target=\"_blank\" >Firefox</a> also. You will likely have problems in any other browser.");
				document.write("<a class='close' href='#' onclick='document.getElementById(\"broCheck\").style.display=\"none\"; writeCookie(\"hxlNoWarning\", true, 1);' >X</a></div>");
			}
		}
	}
}

BrowserDetect.init();
printBrowserWarning();
