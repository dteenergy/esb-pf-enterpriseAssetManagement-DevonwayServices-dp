<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:dp="http://www.datapower.com/extensions" xmlns:date="http://exslt.org/dates-and-times" xmlns:dyn="http://exslt.org/dynamic" xsi:schemaLocation="http://www.datapower.com/schemas/json jsonx.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx" xmlns:dpconfig="http://www.datapower.com/param/config" extension-element-prefixes="dp date" exclude-result-prefixes="dp date">
	<xsl:param name="dpconfig:IPMPClass" select="''"/>
    <xsl:variable name="IPMPClass" select="$dpconfig:IPMPClass"/>
    <xsl:param name="dpconfig:ReportingAuthority" select="''"/>
    <xsl:variable name="ReportingAuthority" select="$dpconfig:ReportingAuthority"/>
	<xsl:template match="/">
		<xsl:variable name="update_DevPayload">
			<json:object xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:json="http://www.ibm.com/xmlns/prod/2009/jsonx" xsi:schemaLocation="http://www.datapower.com/schemas/json jsonx.xsd">
				<json:string name="Building">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DTE_BUILDING']"/>
				</json:string>
				<json:string name="Status">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='STATUS']"/>
				</json:string>
				<json:string name="Description">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DESCRIPTION']"/>
				</json:string>
				<json:string name="Grid">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DTE_GRID']"/>
				</json:string>
				<json:string name="IPMPClass">
					<xsl:value-of select="$IPMPClass"/>
				</json:string>
				<json:string name="Code">
					<xsl:value-of select="''"/>
				</json:string>
				<json:string name="Name">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='LOCATION']"/>
				</json:string>
				<json:string name="SystemNumber">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DTE_SYSTEM']"/>
				</json:string>
				<json:string name="QALevel">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='PLUSQUAL']"/>
				</json:string>
				<json:string name="Room">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DTE_ROOM']"/>
				</json:string>
				<json:string name="ReportingAuthority">
					<xsl:value-of select="$ReportingAuthority"/>
				</json:string>
				<json:string name="Floor">
					<xsl:value-of select="/*[local-name()='SyncDTEFERMILOCDVW']/*[local-name()='DTEFERMILOCDVWSet']/*[local-name()='LOCATIONS']/*[local-name()='DTE_FLOOR']"/>
				</json:string>
			</json:object>
		</xsl:variable>
		<xsl:copy-of select="$update_DevPayload"/>
		<dp:set-variable name="'var://context/ALM_Location/update_DevPayload'" value="$update_DevPayload"/>
	</xsl:template>
</xsl:stylesheet>