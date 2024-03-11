var urlopen = require('urlopen');
var fs = require('fs');
var hm = require('header-metadata');
var sm = require('service-metadata');
var ctx = session.name("ALM_Location") || session.createContext("ALM_Location");
var Id = ctx.getVar("Id");
var logger = console.options({
	'category': 'all'
});
session.input.readAsJSON(function(readAsJSONError, incomingdata) {
	if (readAsJSONError) {
		logger.error("Error in reading incoming data");
		session.reject(readAsJSONError);
	}
	else {
		var key = session.parameters.key;
		var devUrl = 'https://rest-config.devonway.com/RESTConnect/rest/v2/subscribers/' + key + '/modules/DTE-PIS';
		var devUrlPayload = {
			target: devUrl,
			sslClientProfile: 'ALM_ClientProfile',
			method: 'POST',
			contentType: 'application/json',
			headers: {
				'osiApiToken': Id
			},
			data: incomingdata
		};
		try {
			urlopen.open(devUrlPayload, function(error, response) {
				if (error) {
					logger.error("url connection error with 'devUrlPayload'" + error);
					session.reject("url connection error with 'devUrlPayload'" + error);
				} else {
					var responseStatusCode = response.statusCode;
					var responsePhrase = response.reasonPhrase;
					if (responseStatusCode == 200 || responseStatusCode == 201) {
						response.readAsBuffer(function(error, responseData) {
							if (error) {
								logger.error("error reading response 'devUrlPayload'" + error);
								session.reject("error reading response 'devUrlPayload'" + error);
							} else {
								hm.response.statusCode = responseStatusCode;
								ctx.setVar("devResponse", responseData);
							}
						});
					} else {
						response.readAsBuffer(function(error, responseData) {
							if (error) {
								//dp:reject stop the transaction and go error rule with error code and description
								logger.error("error in reading error response received from devUrlPayload : " + error);
								session.reject("error in reading error response received from devUrlPayload : " + error);
							} else {
								hm.response.statusCode = responseStatusCode;
								logger.error("error response received from devUrlPayload : " + responseStatusCode + " " + responsePhrase + " " + responseData);
								session.reject("error response received from devUrlPayload : " + responseStatusCode + " " +  responsePhrase + " " +  responseData);
							}
						});
					}
				}
			});
		}
		catch (error) {
			logger.error("url connection error with 'devUrlPayload'" + error);
			session.reject("url connection error with 'devUrlPayload'" + error);
		}
	}
});
