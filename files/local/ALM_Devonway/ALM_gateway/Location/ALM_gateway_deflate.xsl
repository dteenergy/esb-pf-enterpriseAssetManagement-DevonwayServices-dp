<!-- This xslt is used to invoke job oms api and get the response -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:dp="http://www.datapower.com/extensions" xmlns:dpconfig="http://www.datapower.com/param/config" extension-element-prefixes="dp" exclude-result-prefixes="dp dpconfig">
	<xsl:output method="xml" indent="yes" omit-xml-declaration="yes"/>
	<xsl:template match="/">
		<xsl:variable name="IncomingPayload">
			<xsl:copy-of select="."/>
		</xsl:variable>
		<xsl:variable name="messageId" select="/*[local-name()='SyncDTEFERMILOCDVW']/@*[local-name()='messageID']"/>
		<xsl:variable name="eventContext" select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='LOCATION']"/>
		<xsl:variable name="EventTimeStamp" select="/*[local-name()='SyncDTEFERMILOCDVW']/@*[local-name()='creationDateTime']"/>
		<dp:set-variable name="'var://context/ALM_Location_seq/messageId'" value="string($messageId)"/>
		<dp:set-variable name="'var://context/ALM_Location_seq/eventContext'" value="string($eventContext)"/>
		<dp:set-variable name="'var://context/ALM_Location_seq/EventTimeStamp'" value="string($EventTimeStamp)"/>
		<xsl:variable name="payload">
			<dp:serialize select="." omit-xml-decl="yes"/>
		</xsl:variable>
		<dp:set-variable name="'var://context/ALM_Location_seq/deflatedPayload'" value="dp:deflate($payload)"/>
	</xsl:template>
</xsl:stylesheet>