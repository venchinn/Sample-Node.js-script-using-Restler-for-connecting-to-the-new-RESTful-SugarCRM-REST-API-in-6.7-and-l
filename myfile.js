var sys = require('util'),
    rest = require('restler');

var baseurl = "<<instance URL>>/rest/v10"

// get oAuth token
var jsonData = {"grant_type":"password","username":"<<username>>","password":"<<password>>","client_id":"sugar"};
rest.postJson(baseurl+'/oauth2/token', jsonData).on('2XX', function(data) {
    if ( data.error ) {
        sys.puts("Error: " + data.error_message);
    }

    var token = data.access_token;
    sys.puts('Success! OAuth token is ' + token);

    // now with a token, make a call
    rest.get(baseurl+"/me", { 
        headers:  { "Content-Type" : "application/json", "OAuth-Token": token }
        }).on('2XX', function(data) {
            if ( data.error ) {
                sys.puts("Error: " + data.error_message);
            }
            sys.puts(JSON.stringify(data));
        });
    });
