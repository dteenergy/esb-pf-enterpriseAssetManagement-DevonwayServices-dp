var urlopen = require('urlopen');
var fs = require('fs');
var hm = require('header-metadata');
var sm = require('service-metadata');
var ctx = session.name("ALM_Location") || session.createContext("ALM_Location");
var logger = console.options({
	'category': 'all'
});
var key = session.parameters.key;
var sessionIdUri = 'https://rest-config.devonway.com/RESTConnect/rest/v2/subscribers/' + key;
var getSessionId = {
	target: sessionIdUri,
	sslClientProfile: 'ALM_ClientProfile',
	method: 'GET',
	contentType: 'application/json'
};
try {
	urlopen.open(getSessionId, function(error, response) {
		if (error) {
			logger.error("urlopen connect error with getSessionId" + error);
			session.reject("urlopen connect error with getSessionId" + error);
		} else {
			var responseStatusCode = response.statusCode;
			var Id = response.headers.DWAYSessionId;
			ctx.setVar("sessionIdResponse", response);
			ctx.setVar("Id", Id);
			if (responseStatusCode == 200) {
				response.readAsBuffer(function(error, responseData) {
					if (error) {
						//dp:reject stop the transaction and go error rule with error code and description
						logger.error("failure in reading response from getSessionId" + error);
						session.reject("failure in reading response from getSessionId" + error);
					} else {
						hm.response.statusCode = responseStatusCode;
					}
				});
			} else {
				response.readAsBuffer(function(error, responseData) {
					if (error) {
						//dp:reject stop the transaction and go error rule with error code and description
						logger.error("failure in reading message from getSessionId for negative ack " + JSON.stringify(error));
						session.reject("failure in reading message from getSessionId for negative ack " + error);
					} else {
						logger.error("response received from getSessionId for negative ack " + " " + responseStatusCode + responseData);
						session.reject("response received from getSessionId for negative ack " + " " + responseStatusCode + responseData);
					}
				});
			}
		}
	});
}
catch (error) {
	logger.error("urlopen connect error with getSessionId" + error);
	session.reject("urlopen connect error with getSessionId" + error);
}