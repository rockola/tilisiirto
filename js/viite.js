(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports);
    } else {
        // Browser globals
        factory(root.Viite = {});
    }
}(this, function(exports){

    function checkViite(viite) {
	if (viite.match(/[^0-9 ]/))
	    return false;
	
	// remove spaces & leading zeros
	viite = viite.replace(/ /g, '').replace(/^[0]+/, '');
	
	// valid codes are between 4 and 20 digits in length
	if (viite.length < 4 || viite.length > 20)
	    return false;
	
	var checksum = 0;
	var multipliers = [7, 3, 1];
	
	for (var i = 0; i < viite.length - 1; i++) {
	    checksum += multipliers[i % 3] * parseInt(viite[i]);
	}
	
	return parseInt(viite[viite.length-1]) == ((10 - checksum % 10) % 10);
    }
    
    var NON_NUMERIC = /[^0-9]/g,
	EVERY_FIVE_CHARS =/(.{5})(?!$)/g;
    
    
    function electronicFormat(viite) {
	return viite.replace(/[^0-9]/g, '');
    }
    
    function printFormat(viite) {
	return electronicFormat(viite).replace(EVERY_FIVE_CHARS, "$1" + separator);
    }

    /****************************************************************
     */

    exports.checkViite = printFormat;
    exports.electronicFormat = printFormat;
    exports.printFormat = printFormat;
}));
