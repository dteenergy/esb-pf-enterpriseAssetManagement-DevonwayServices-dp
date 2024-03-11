var ctx = session.name("ALM_Location") || session.createContext("ALM_Location");
var urlopen = require('urlopen');
var hm = require('header-metadata');
var sm = require('service-metadata');
var logger = console.options({ 'category': 'all' });
var dateTime = new Date();
var currentTime = dateTime.toISOString();
var eventContext = ctx.getVariable("eventContext");
var seqConfPayload =
{
	"messageId": ctx.getVariable("messageId"),
	"eventType": ctx.getVariable("eventType"),
	"eventContext": eventContext,
	"serviceName": ctx.getVariable("serviceName"),
	"EventTimeStamp": ctx.getVariable("EventTimeStamp"),
	"sendTimeStamp": currentTime,
	"messageType": ctx.getVariable("messageType"),
	"confirmationMsg" : 'Y'
}
var StandaloneMQurl = session.parameters.ALM_Location_SeqConfUrl;
var publishuri = {
	target: StandaloneMQurl,
	data: seqConfPayload
};
urlopen.open(publishuri, function(error, response) {
	var hm = require('header-metadata');
	if (error) {
		var mqconnection = 'Forbidden';
		ctx.setVariable("mqconnection", mqconnection);
		logger.error("ALM_001: url connection error 'Sequence Request'" + error);
		session.reject("ALM_001: url connection error 'Sequence Request'" + error);
	} else {
		var mqrc = response.statusCode;
		if (mqrc == 0) {
			var replyMQMD = response.get({
				type: 'mq'
			}, 'MQMD');
			var replyMQRFH2 = response.get({
				type: 'mq'
			}, 'MQRFH2');
			response.readAsBuffer(function(readError, responseData) {
				if (readError) {
					hm.response.statusCode = 403
					logger.error("ALM_002 : error reading in response from 'Sequence Request'" + readError);
					session.reject("ALM_002 : error reading in response from 'Sequence Request'" + readError);

				} else {
					logger.debug("MQResponsecode " + mqrc);
					ctx.setVar("response", responseData);
				}
			});
		} else {
			response.readAsBuffer(function(readError, responseData) {
				if (readError) {
					var mqconnection = 'Forbidden';
					ctx.setVariable("mqconnection", mqconnection);
					logger.error("ALM_003:error in reading error response 'Sequence Request'" + readError);
					session.reject("ALM_003:error in reading error response 'Sequence Request'" + readError);
				} else {
					var errorinfo = "SOM_AM_006:error response 'Sequence Request', details are : " + info + "; response info :" + JSON.stringify(response) + "; ResponseStatusCode :" + mqrc
					var mqconnection = 'Forbidden';
					ctx.setVariable("mqconnection", mqconnection);
					logger.error("ALM_003:error response received from 'Sequence Request'" + readError);
					session.reject("ALM_003:error response received from 'Sequence Request'" + readError);
				}
			});
		}
	}
	//pushing to queue end
});