var ctx = session.name("ALM_Location_seq") || session.createContext("ALM_Location_seq");
var urlopen = require('urlopen');
var hm = require('header-metadata');
var sm = require('service-metadata');
var logger = console.options({ 'category': 'all' });
var dateTime = new Date();
var currentTime = dateTime.toISOString();
var EventTimeStamp = ctx.getVariable("EventTimeStamp");
var eventContext = ctx.getVariable("eventContext");
var ESTTimeStamp = DateConversion(EventTimeStamp);
var deflatedPayload = ctx.getVariable("deflatedPayload");
var seqPayload =
{
	"messageId": ctx.getVariable("messageId"),
	"serviceName": "fermiLocation",
	"expiry": session.parameters.expiry,
	"eventType": "fermiLocationEvent",
	"eventContext": eventContext,
	"payload": deflatedPayload,
	"EventTimeStamp": ESTTimeStamp,
	"sendTimeStamp": currentTime,
	"waitTime": session.parameters.waitTime,
	"messageType": "fermiLocationEvent",
	"destQueueName": 'ALM.LOCATION.RECEIVE.SEQ'
}
var StandaloneMQurl = session.parameters.ALM_Location_SequanceUrl;
var publishuri = {
	target: StandaloneMQurl,
	data: seqPayload
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
function DateConversion(incomingDateTime) {
	var finalutcDate;
	var GMTDate = new Date(incomingDateTime);
	var ESTDateVar = GMTDate.getTime();
	var utc = ESTDateVar
	var ctx = session.name("ALM_Location_seq") || session.createContext("ALM_Location_seq");
	ctx.setVariable("utc", utc);
	var ESTDate = new Date(utc).toISOString();
	ctx.setVariable("ESTDate", ESTDate);
	var finalutcDate = ESTDate;
	return finalutcDate;
}