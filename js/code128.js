var code128 = (function(){
    var codes = [[0," "," ","00","212222","11011001100"],
		 [1,"!","!","01","222122","11001101100"],
		 [2,"\"","\"","02","222221","11001100110"],
		 [3,"#","#","03","121223","10010011000"],
		 [4,"$","$","04","121322","10010001100"],
		 [5,"%","%","05","131222","10001001100"],
		 [6,"&","&","06","122213","10011001000"],
		 [7,"'","'","07","122312","10011000100"],
		 [8,"(","(","08","132212","10001100100"],
		 [9,")",")","09","221213","11001001000"],
		 [10,"*","*","10","221312","11001000100"],
		 [11,"+","+","11","231212","11000100100"],
		 [12,",",",","12","112232","10110011100"],
		 [13,"-","-","13","122132","10011011100"],
		 [14,".",".","14","122231","10011001110"],
		 [15,"/","/","15","113222","10111001100"],
		 [16,"0","0","16","123122","10011101100"],
		 [17,"1","1","17","123221","10011100110"],
		 [18,"2","2","18","223211","11001110010"],
		 [19,"3","3","19","221132","11001011100"],
		 [20,"4","4","20","221231","11001001110"],
		 [21,"5","5","21","213212","11011100100"],
		 [22,"6","6","22","223112","11001110100"],
		 [23,"7","7","23","312131","11101101110"],
		 [24,"8","8","24","311222","11101001100"],
		 [25,"9","9","25","321122","11100101100"],
		 [26,":",":","26","321221","11100100110"],
		 [27,";",";","27","312212","11101100100"],
		 [28,"<","<","28","322112","11100110100"],
		 [29,"=","=","29","322211","11100110010"],
		 [30,">",">","30","212123","11011011000"],
		 [31,"?","?","31","212321","11011000110"],
		 [32,"@","@","32","232121","11000110110"],
		 [33,"A","A","33","111323","10100011000"],
		 [34,"B","B","34","131123","10001011000"],
		 [35,"C","C","35","131321","10001000110"],
		 [36,"D","D","36","112313","10110001000"],
		 [37,"E","E","37","132113","10001101000"],
		 [38,"F","F","38","132311","10001100010"],
		 [39,"G","G","39","211313","11010001000"],
		 [40,"H","H","40","231113","11000101000"],
		 [41,"I","I","41","231311","11000100010"],
		 [42,"J","J","42","112133","10110111000"],
		 [43,"K","K","43","112331","10110001110"],
		 [44,"L","L","44","132131","10001101110"],
		 [45,"M","M","45","113123","10111011000"],
		 [46,"N","N","46","113321","10111000110"],
		 [47,"O","O","47","133121","10001110110"],
		 [48,"P","P","48","313121","11101110110"],
		 [49,"Q","Q","49","211331","11010001110"],
		 [50,"R","R","50","231131","11000101110"],
		 [51,"S","S","51","213113","11011101000"],
		 [52,"T","T","52","213311","11011100010"],
		 [53,"U","U","53","213131","11011101110"],
		 [54,"V","V","54","311123","11101011000"],
		 [55,"W","W","55","311321","11101000110"],
		 [56,"X","X","56","331121","11100010110"],
		 [57,"Y","Y","57","312113","11101101000"],
		 [58,"Z","Z","58","312311","11101100010"],
		 [59,"[","[","59","332111","11100011010"],
		 [60,"\\","\\","60","314111","11101111010"],
		 [61,"]","]","61","221411","11001000010"],
		 [62,"^","^","62","431111","11110001010"],
		 [63,"_","_","63","111224","10100110000"],
		 [64,"NUL","`","64","111422","10100001100"],
		 [65,"SOH","a","65","121124","10010110000"],
		 [66,"STX","b","66","121421","10010000110"],
		 [67,"ETX","c","67","141122","10000101100"],
		 [68,"EOT","d","68","141221","10000100110"],
		 [69,"ENQ","e","69","112214","10110010000"],
		 [70,"ACK","f","70","112412","10110000100"],
		 [71,"BEL","g","71","122114","10011010000"],
		 [72,"BS","h","72","122411","10011000010"],
		 [73,"HT","i","73","142112","10000110100"],
		 [74,"LF","j","74","142211","10000110010"],
		 [75,"VT","k","75","241211","11000010010"],
		 [76,"FF","l","76","221114","11001010000"],
		 [77,"CR","m","77","413111","11110111010"],
		 [78,"SO","n","78","241112","11000010100"],
		 [79,"SI","o","79","134111","10001111010"],
		 [80,"DLE","p","80","111242","10100111100"],
		 [81,"DC1","q","81","121142","10010111100"],
		 [82,"DC2","r","82","121241","10010011110"],
		 [83,"DC3","s","83","114212","10111100100"],
		 [84,"DC4","t","84","124112","10011110100"],
		 [85,"NAK","u","85","124211","10011110010"],
		 [86,"SYN","v","86","411212","11110100100"],
		 [87,"ETB","w","87","421112","11110010100"],
		 [88,"CAN","x","88","421211","11110010010"],
		 [89,"EM","y","89","212141","11011011110"],
		 [90,"SUB","z","90","214121","11011110110"],
		 [91,"ESC","[","91","412121","11110110110"],
		 [92,"FS","|","92","111143","10101111000"],
		 [93,"GS","],","93","111341","10100011110"],
		 [94,"RS","~","94","131141","10001011110"],
		 [95,"US","DEL","95","114113","10111101000"],
		 [96,"FNC3","FNC3","96","114311","10111100010"],
		 [97,"FNC2","FNC2","97","411113","11110101000"],
		 [98,"SHIFT","SHIFT","98","411311","11110100010"],
		 [99,"CODEC","CODEC","99","113141","10111011110"],
		 [100,"CODEB","FNC4","CODEB","114131","10111101110"],
		 [101,"FNC4","CODEA","CODEA","311141","11101011110"],
		 [102,"FNC1","FNC1","FNC1","411131","11110101110"],
		 [103,"StartA","StartA","StartA","211412","11010000100"],
		 [104,"StartB","StartB","StartB","211214","11010010000"],
		 [105,"StartC","StartC","StartC","211232","11010011100"],
		 [106,"Stop","Stop","Stop","2331112","1100011101011"]];

    /**
       input: (numeric) string to be encoded
       codeType: ignored (always C)
       barwidth: width of a single-width bar in barcode
       barheight: bar height
     */
    function theCode(input, codeType, barwidth, barheight) {
	var ret = [];
	var i = 0;

	var odd = false;
	if (input.length % 2 == 1) {
	    odd = true;
	}

	var j = 0;
	if (odd) {
	    ret[i++] = 104; // Start B
	    ret[i++] = input.charCodeAt(j++) - 48;
	} 
	ret[i++] = 105; // Start C

	while (j < input.length) {
	    var c1 = input.charCodeAt(j);
	    var c2 = input.charCodeAt(j+1);
	    var k = (c1 - 48) * 10 + (c2 - 48);
	    //console.log("j "+j+" c1,c2 "+c1+","+c2+" k "+k+" codes[k][4] "+codes[k][4]);
	    ret[i++] = k;
	    j = j + 2;
	}


	// Checksum (Tarkiste 2)
	var check = ret[0];
	for (var c = 1; c < ret.length; c++) {
	    check = check + c * ret[c];
	}
	var checksum = check % 103;

	ret[i++] = checksum;
	ret[i++] = 106; // Stop

	var v = 'ret [' + ret.length + '] ';
	for (var c = 0; c < ret.length; c++) {
	    v = v + ret[c] + ' ';
	}
	console.log(v);

	var c = ''
	var ones = true;
	for (var k = 0; k < ret.length; k++) {
	    var ch = codes[ret[k]][4];
	    for (var x = 0; x < ch.length; x++) {
		var w = ch.charCodeAt(x) - 48;
		if (w < 1 || w > 4) {
		    console.log('ch '+ch+' x '+x+' w '+w+'!');
		}
		var width = barwidth * (w + 0);
		if (ones) {
		    c = c + 'v ' + barheight + ' h ' + width + ' v -' + barheight + ' h -' + width;
		} 
		// just move for 0, but also move for 1 to beginning of next char
		c = c + ' m ' + width + ' 0 ';
		ones = !ones;
	    }
	}
	return c;
    }

    return {

	barcode128c: function(input, pathOnly) {
	    var c = theCode(input, 'c', 1, 36);
	    if (pathOnly) {
		return c;
	    }
	    return '<path d="M 0 0 ' + c + '" fill="black" stroke="transparent"/>';
	}
    };
    
})();
