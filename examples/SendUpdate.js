const https = require('https');
const fs = require('fs');

var body = fs.readFileSync(__dirname + '/../' + 'iphone1604-1.xml','utf8')

var postRequest = {
    host: "api.ebay.com",
    path: "/ws/api.dll",
    port: 443,
    method: "POST",
    headers: {
        'X-EBAY-API-COMPATIBILITY-LEVEL': "613",
        'X-EBAY-API-DEV-NAME': "30f0908c-bff7-4552-a8c8-7859faf5311b",
        'X-EBAY-API-APP-NAME': "StephenC-tradingp-PRD-75d80d3bd-a10f3a1f",
        'X-EBAY-API-CERT-NAME': "PRD-5d80d3bd03ff-2b6f-480e-a38b-af61",
        'X-EBAY-API-CALL-NAME': "ReviseItem",
        'X-EBAY-API-DETAIL-LEVEL': "0",
        'X-EBAY-API-SITEID': "2",
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(body)
    }
};

var buffer = "";

var req = https.request( postRequest, function( res )    {

   console.log( res.statusCode );
   var buffer = "";
   res.on( "data", function( data ) { buffer = buffer + data; } );
   res.on( "end", function( data ) { console.log( buffer ); } );

});

req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
});

req.write( body );
req.end();