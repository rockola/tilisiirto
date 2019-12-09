// ****************************************************************
// tilisiirto.js

// ****************************************************************

function btCreateLabel(labelFor, text) {
    // return '<label for="' + labelFor + '">' + text + '</label>';
    return $('<label/>', {
	for: labelFor,
	html: text
    });
}

function btCreateInput(inputType, name) {
    return $('<input/>', {
	type: inputType,
	id: name,
	name: name
    });
}

function btCreateTextarea(name, rows, cols) {
    if (!rows) {
	rows = 3;
    }
    if (!cols) {
	cols = 40;
    }
    return $('<textarea/>', {
	id: name,
	name: name,
	rows: rows,
	cols: cols
    });
}

function btInput(cssClass, inputType) {
    $(cssClass).each(function(){
	var _for = $(this).attr('for');
	var _text = $(this).text();
	$(this).empty();
	$(this)
	    .append(btCreateLabel(_for, _text))
	    .append(btCreateInput(inputType, _for));
    });
}

function btTextarea(x) {
    var _for = $(x).attr('for');
    var _text = $(x).text();
    $(x).empty();
    $(x).append(btCreateLabel(_for, _text))
	.append(btCreateTextarea(_for));
}

function btDate(x) {
    var _for = $(x).attr('for');
    var _text = $(x).text();
    $(x).empty();
    /*
    $(x)
	.append(btCreateLabel(_for, _text))
    	.append($('<div/>', { name: _for } ).datepicker());
    */
    $(x)
	.append(btCreateLabel(_for, _text))
    	.append($('<input/>', { name: _for, id: _for } )
		.datepicker( {
		    language: 'fi-FI',
		    format: 'd.m.yyyy',
		    autoPick: true,
		}));
}

$.fn.extend({
    btAppendOK: function(fn) {
	var _id = $(this).attr('id');
	var _okid = _id + '_ok';
	var _notokid = _id + '_notok';
	var _ok = '#' + _okid;
	var _notok = '#' + _notokid;
	$(this).parent().append($('<span/>', { id: $(this).id + 'ok' })
				.append($('<ion-icon/>', {
				    class: 'ok',
				    id: _okid,
				    name: 'checkmark'
				}))
				.append($('<ion-icon/>', {
				    class: 'notok',
				    id: _notokid,
				    name: 'close-circle'
				})));
	$(_ok).hide();
	$(_notok).hide();
	$(this).focusout(function(){
	    var isok = fn($(this).val());
	    $(_ok).toggle(isok);
	    $(_notok).toggle(!isok);
	});
    }
});

/**
   Generate barcode using form information.
   NOTE: IBAN is assumed to be a Finnish IBAN!

   outputType: one of 'svg', 'path', 'pathOnly'
*/
function generateBarcode(outputType) {
    function zeroFormat(value, width) {
	return ('00000000000000000000'+value).slice(-width);
    }
    var theIban = IBAN.electronicFormat($('#iban').val()).substr(2); 
    var theSum = currency($('#summa').val(), { separator: '', decimal: ',' });
    if (theSum.dollars() < 0 || theSum.dollars() >= 1000000) {
	// bar code amount is set to zero if amount is not between 0 and 1000000
	theSum = currency('0');
    }
    // alert('theIban [' + theIban + '] theSum [' + theSum + ']');
    var theDate = $('#erapvm').datepicker('getDate');
    var theYear = theDate.getFullYear() - 2000;
    var theMonth = theDate.getMonth() + 1;
    if (theMonth < 10) {
	theMonth = '0' + theMonth;
    }
    var theDay = theDate.getDate();
    if (theDay < 10) {
	theDay = '0' + theDay;
    }
    // theCode =
    //   Version(1) + IBAN w/o country code(16)
    //   + Euros(6) + Cents(2) + For future use(3)
    //   + Banking reference in national format(20)
    //   + Due date YYMMDD(6)
    // Total 1+16+6+2+3+20+6 = 54 numeric characters
    var theCode = '4'
	+ theIban
	+ zeroFormat(theSum.dollars(), 6)
	+ zeroFormat(theSum.cents(), 2)
	+ '000'
	+ Viite.electronicFormat($('#viite').val(), 20)
	+ theYear
	+ theMonth
	+ theDay;
    if (theCode.length != 54) {
	alert("Viivakoodia [" + theCode + "] ei voitu luoda, pituus ei täsmää");
	return null;
    }
    // $('#barcodetest').html(theCode);
    if (outputType === 'pathOnly') {
	return code128.barcode128c(theCode, true);
    }
    var barcode = code128.barcode128c(theCode, false);
    if (outputType === 'svg') {
	var svgbarcode = '<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="80">'
	    + barcode
	    + '</svg>';
	// console.log(svgbarcode);
	return svgbarcode;
    } else if (outputType === 'path') {
	return barcode;
    } else {
	console.log('generateBarcode: outputType unknown [' + outputType + ']');
	return null;
    }
}

/**
   Generates a random IBAN for testing purposes.
   The IBAN is Finnish with nonexistent bank code 999.
   NOTE: There isn't a bank code allocated for testing purposes,
   therefore this function may start to return existing account
   numbers if 999 is ever assigned to a real bank!
*/
function randomIBAN() {
    function randomDigit() {
	return Math.floor(Math.random() * 10);
    }
    var acct = '999';
    for (var i = 0; i < 11; i++) {
	acct = acct + randomDigit().toString();
    }
    return IBAN.fromBBAN('FI', acct);
}

/** 
    Random integer between MIN and MAX, inclusive.
*/
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
   Generates a random bank reference for testing purposes.
*/
function randomViite() {
    var reference = randomInt(100, Number.MAX_SAFE_INTEGER).toString();
    console.log('ref '+reference);
    return Viite.withChecksum(reference);
}

function dueDateAdd(n) {
    if (n < 1)
	return;
    var invoiceDate = $('#pvm').datepicker('getDate');
    $('#erapvm').datepicker('setDate',
			    moment(invoiceDate).add(n, 'day').toDate());
}

$(function(){
    const version = '0.1.0';
    $('#version').html(version);
    $('.bt-tf').each(function(){
	btInput($(this), 'textfield');
    });
    $('.bt-txt').each(function(){
	btTextarea(this);
    });
    $('.bt-date').each(function(){
	btDate(this);
    });

    $('#pvm').on('change', function() {
	$('#erapvm').datepicker('setStartDate',
				$('#pvm').datepicker('getDate'));
    });

    $('#iban').btAppendOK(IBAN.isValid);
    // BIC is not used for now - not required with EUR transfers
    $('#bic').prop("disabled", true); 
    $('#viite').btAppendOK(Viite.checkViite);

    $('#demo').click(function(){
	$('#iban').val(IBAN.printFormat(randomIBAN()));
	$('#saaja').val("Salli Saaja\nDogränden 13 A 498\n02150 ESBO");
	$('#selite').val("Keskinäisen kehumisen yhdistyksen jäsenmaksu vuodelle 2020");
	$('#maksaja').val("Matti Maksaja\nNollakatu 0\n00100 HELSINKI");
	$('#maksajantili').val(IBAN.printFormat(randomIBAN()));
	$('#viite').val(Viite.printFormat(randomViite()));
	$('#summa').val(randomInt(1,999999)+','+randomInt(0,99));
    });

    $('#plus14').click(function(){ dueDateAdd(14); });
    $('#plus30').click(function(){ dueDateAdd(30); });

    $('#luo').click(function(){

	var iban = $('#iban').val();
	if (!IBAN.isValid(iban)) {
	    alert('Saajan pankkitili [' + iban + '] ei ole laillinen IBAN-numero. Tarkista saajan pankkitili.');
	    return false;
	}

	var summa = $('#summa').val();
	if (summa < 0) {
	    alert('Laskun summa ei voi olla negatiivinen [oli ' + summa + ']');
	    return false;
	}

	var viite = $('#viite').val();
	if (viite != '' && !Viite.checkViite(viite)) {
	    alert('Laskun viite [' + viite + '] ei ole laillinen viite. Tarkista viite.');
	    return false;
	}

	var barcode = generateBarcode('svg');
	//$('#barcode').html(barcode);

	const mmperpt = 72 / 25.4;
	function mm(n) { return n * mmperpt; }

	const doc = new PDFDocument({ size: 'A4', margin: 0 });
	const stream = doc.pipe(blobStream());

	doc.text($('#maksaja').val(), mm(20), mm(43));

	doc.text('Tilisiirto', mm(115), mm(20));
	doc.text('IBAN ' + IBAN.printFormat($('#iban').val()));
	doc.text('Saaja ' + $('#saaja').val());
	doc.text('Viite ' + Viite.printFormat($('#viite').val()));
	doc.text('Summa ' + $('#summa').val());
	doc.text('Eräpäivä ' + $('#erapvm').val());

	const thinLine = mm(0.13);
	const thickLine = mm(0.5);

	doc.lineWidth(thickLine);
	var y = 764; // 297mm - (13/12 * 72p)
	doc.moveTo(0,y).lineTo(595,y).stroke();
	y = 740; // 297mm - ((13+4)/12 * 72p)
	doc.moveTo(0,y).lineTo(595,y).stroke();
	y = 644; // 297mm - ((13+4+2+14)/12 * 72p)
	var x = 302;
	doc.moveTo(0,y).lineTo(x,y).stroke();
	y = 602; // 297mm - ((13+4+2+14+7)/12 * 72p)
	doc.moveTo(0,y).lineTo(x,y).stroke();
	y = 553;
	doc.moveTo(x,y).lineTo(x,764).stroke();
	x = 58; // .8 * 72
	doc.moveTo(x,y).lineTo(x, y + 90).stroke();
	x = 350;
	y = 716;
	doc.moveTo(302,y).lineTo(595, y).stroke();
	doc.moveTo(x,y).lineTo(x, y + 48).stroke();
	x = 450;
	y = 740;
	doc.moveTo(x,y).lineTo(x, y + 24).stroke();
	
	doc.lineWidth(thinLine);
	doc.moveTo(58,740).lineTo(58,764).stroke();
	y = 728; // 297mm - ((13+4+2)/12 * 72p)
	doc.moveTo(80,y).lineTo(302,y).stroke();
	y = 553;
	doc.moveTo(0,y).lineTo(595,y).dash(2).stroke();	

	doc.fontSize(7).font('Helvetica');
	doc.text(' ', 0,550);
	doc.text('Saajan\ntilinumero\nMottagarens\nkontonummer', {
	    width: 55,
	    align: 'right'
	});
	doc.text(' ', 62,550);
	doc.text('IBAN', {
	    align: 'left'
	});
	doc.text(' ', 0,600);
	doc.text('Saaja\nMottagare', {
	    width: 55,
	    align: 'right'
	});
	doc.text(' ', 0, 640);
	doc.text('Maksajan\nnimi ja\nosoite\nBetalarens\nnamn och\nadress', {
	    width: 55,
	    align: 'right'
	});
	doc.text(' ', 0, 712);
	doc.text('Allekirjoitus\nUnderskrift', {
	    width: 55,
	    align: 'right'
	});
	doc.text(' ', 0, 737);
	doc.text('Tililtä nro\nFrån konto nr', {
	    width: 55,
	    align: 'right'
	});
	doc.text(' ', 306, 712);
	doc.text('Viitenumero\nRef. nr', {
	    width: 55,
	    align: 'left'
	});
	doc.text(' ', 306, 737);
	doc.text('Eräpäivä\nFörfallodag', {
	    width: 55,
	    align: 'left'
	});
	doc.text(' ', 454, 737);
	doc.text('Euro', {
	    width: 55,
	    align: 'left'
	});
	
	doc.fontSize(6);
	doc.text(' ', 440, 780);
	doc.text('Maksu välitetään saajalle maksujenvälityksen ehtojen\n'
		 + 'mukaisesti ja vain maksajan ilmoittaman tilinumeron\n'
		 + 'perusteella.\n'
		 + 'Betalningen förmedlas till mottagaren enligt villkoren\n'
		 + 'för betalningsförmedling och endast till det\n'
		 + 'kontonummer som betalaren angivit.', {
		     width: 200,
		     align: 'left'
		 });

	doc.fontSize(8).font('Helvetica-Bold');
	doc.save();
	doc.rotate(270).text('TILISIIRTO. GIRERING', -735, 10);
	doc.restore();

	doc.fontSize(12).font('Helvetica-Bold');
	doc.text(IBAN.printFormat($('#iban').val()), 75,575);
	doc.text(Viite.printFormat($('#viite').val()), 355,725);
	doc.text($('#erapvm').val(), 355,750);
	doc.text($('#summa').val(), 500,750);
	doc.fontSize(10).font('Helvetica');
	doc.text($('#saaja').val(), 75,608);
	doc.text(' ', 325, 555);
	doc.text($('#selite').val(), { width: 250 });
	doc.text(' ', 75, 640);
	doc.text($('#maksaja').val(), { width: 240 });

	// Barcode
	barcode = generateBarcode('pathOnly');
	console.log('barcode: '+barcode);
	// barcode has to be scaled to 105 mm width
	var scale = 0.896;
	// origin at 36,792 also after scaling
	// y compensated by shrinkage of barcode along y axis
	var x = 36 / scale;
	var y = (792 / scale) + ((1 - scale) * 36);
	var path = 'M ' + x + ',' + y + ' '+ barcode;
	console.log(path);
	doc.path(path).scale(scale).fill();

	doc.end();
	stream.on('finish', function() {
	    const url = stream.toBlobURL('application/pdf');
	    // window.location.href = url;
	    $('#showpdf').attr('data', url);
	});

	event.preventDefault();
    });
});
