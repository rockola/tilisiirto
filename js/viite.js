const Viite = (function() {

    /**
       Compute checksum digit for bank reference.

       v - bank reference without checksum digit
    */
    function checksum(v) {
	var ret = 0;
	var multipliers = [7, 3, 1];
	
	for (var i = 0; i < v.length; i++) {
	    ret += multipliers[i % 3] * parseInt(v[i]);
	}

	return (10 - ret % 10) % 10;
    }

    /**
       Check bank reference validity.
    */
    function checkViite(viite) {
	if (viite.match(/[^0-9 ]/))
	    return false;
	
	viite = electronicFormat(viite);
	
	// valid codes are between 4 and 20 digits in length
	// including checksum
	if (viite.length < 4 || viite.length > 20)
	    return false;
	
	return parseInt(viite[viite.length-1]) == checksum(viite.substr(0,-1));
    }

    /**
       Add checksum to bank reference.
       Note that there is no way to tell from a sequence of numbers
       whether the last digit is a checksum (in case it happens to
       match what the checksum would be for the preceding digits,
       which could well be the case). Repeated calls to withChecksum()
       are therefore discouraged.
     */
    function withChecksum(viite) {
	if (viite.match(/[^0-9 ]/))
	    return false;

	viite = electronicFormat(viite);

	// valid codes are between 4 and 20 digits in length
	// including checksum, so here we have one less
	if (viite.length < 3 || viite.length > 19)
	    return false;

	return viite + checksum(viite).toString();
    }
    
    var NON_NUMERIC = /[^0-9]/g,
	EVERY_FIVE_CHARS =/(.{5})(?!$)/g;
    
    function zeroFormat(value, width) {
	return ('00000000000000000000'+value).slice(-width);
    }

    /**
       width - if nonzero integer, prepend leading zeros up to 
       'width' total width
     */
    function electronicFormat(viite, width) {
	viite = viite.replace(/[^0-9]/g, '');
	if (width) {
	    return zeroFormat(viite, width);
	}
	return viite;
    }
    
    function printFormat(viite) {
	viite = viite.replace(/^0+/, ''); // remove leading zeros
	return electronicFormat(viite).replace(EVERY_FIVE_CHARS,
					       "$1 ");
    }

    /****************************************************************
     */

    return {
	checkViite,
	withChecksum,
	electronicFormat,
	printFormat
    }
})();
