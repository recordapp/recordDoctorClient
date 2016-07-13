$( document ).ready(function() {
    
    // TODO: Parse the id from the input 
    // var ehrId = $('#inputEhrId).val(); or something like that
    
    var ehrId = "50bc1c98-8540-4d86-bbc7-813f7c55377e"; // temporary hardcoded ID

    // Secret authorizaton data
    
    var username = "medrockweek1";
    var password = "medrockweek1";
    
    // api query urls
    var baseUrl = 'https://rest.ehrscape.com/rest/v1';
    var queryUrl = baseUrl + '/query';
    
    // Gets the sessionID from our username and password (even though it supposedly doesn't work).
    
    function getSessionId() {
        
        var response = $.ajax({
            type: "POST",
            url: baseUrl + "/session?username=" + encodeURIComponent(username) +
                    "&password=" + encodeURIComponent(password),
            async: false
        });
        return response.responseJSON.sessionId;
    }
    
    var sessionId = getSessionId();
    
    // Gets the desired data from the AQL Template Samuel has kindly created for us.
    
    function getDataFromId(ehrId) {
        
        $.ajax({
			url: baseUrl + "/view/" + ehrId + "/weight",
			type: 'GET',
			headers: {"Ehr-Session": sessionId},
	    	success: function (data) {
                writeLast10ToCSV(data);
            }
        });
    }
    
    function writeLast10ToCSV(data) {
        
        // TODO
        // najdi zadnjih 10 elementov in jih vrzi v array
        
        // print array v CSV file
        
        console.log(data);
    }
    
    // test of our ehrid
    // get(ehrId);
});