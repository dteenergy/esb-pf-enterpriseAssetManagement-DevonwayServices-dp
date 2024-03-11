<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx" xmlns:dp="http://www.datapower.com/extensions" extension-element-prefixes="dp" exclude-result-prefixes="dp">
	<xsl:output method="xml"/>
	<xsl:template match="@*|node()">
		<xsl:apply-templates select="@*|node()"/>
	</xsl:template>
	<xsl:template match="/">
		<xsl:variable name="IncomingPayload">
			<xsl:copy-of select="."/>
		</xsl:variable>
		<dp:set-variable name="'var://context/ALM_Location/messageId'" value="string(//json:string[@name='messageId'])"/>
		<dp:set-variable name="'var://context/ALM_Location/eventType'" value="string(//json:string[@name='eventType'])"/>
		<dp:set-variable name="'var://context/ALM_Location/serviceName'" value="string(//json:string[@name='serviceName'])"/>
		<dp:set-variable name="'var://context/ALM_Location/messageType'" value="string(//json:string[@name='messageType'])"/>
		<dp:set-variable name="'var://context/ALM_Location/eventContext'" value="string(//json:string[@name='eventContext'])"/>
		<dp:set-variable name="'var://context/ALM_Location/EventTimeStamp'" value="string(//json:string[@name='EventTimeStamp'])"/>
		<xsl:variable name="inflated" select="dp:inflate(//json:string[@name='payload'])"/>
		<xsl:variable name="parsed" select="dp:parse($inflated)"/>
		<xsl:copy-of select="$parsed"/>
		<dp:set-variable name="'var://context/ALM_Location/inflated'" value="$inflated"/>
	</xsl:template>
</xsl:stylesheet>

 