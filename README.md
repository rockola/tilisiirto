# tilisiirto.js

Finnish bank transfer form generator in client-side Javascript

(c) 2019 Ola Rinta-Koski

## Test drive
[https://rockola.github.io/tilisiirto/] (only in Finnish)

## Files
* index.html
  * HTML form for invoice information
* css/tilisiirto.css
  * Stylesheet definitions
* js/tilisiirto.js
  * Business logic
* js/viite.js
  * Finnish bank reference code utilities
* js/code128.js
  * Barcode utilities (Finnish invoice barcode type is Code128C)

## Requirements

* CDN
  * Pure CSS: [https://purecss.io/]
  * JQuery: [https://jquery.com/]
  * Ion Icons: [https://ionicons.com/]
* Bundled 
  * PDFKit: [https://github.com/foliojs/pdfkit]
  * Datepicker: [https://github.com/fengyuanchen/datepicker]
  * blob-stream: [https://github.com/devongovett/blob-stream]
  * iban.js: [https://github.com/arhs/iban.js]
  * currency.js: [https://github.com/scurker/currency.js]
  * moment: [https://github.com/moment/moment]	

### Further reading

The following publications (in Finnish) by [Finanssiala
ry](https://finanssiala.fi) are required reading for hackers and recommended
reading for the curious:

* Tilisiirto-opas
* IBAN ja BIC maksujenvälityksessä
* Pankkiviivakoodi-opas

## Install

If your web root is at /var/www/html:
~~~~
% mkdir -p /var/www/html/tilisiirto/
% cp -r index.html css js /var/www/html/tilisiirto/
~~~~

## License
MIT

## Acknowledgements
All bundled files are MIT-licensed. See LICENSE-BUNDLED.md for
license information.


