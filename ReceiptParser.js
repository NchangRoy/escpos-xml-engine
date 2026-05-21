import { XMLParser } from "fast-xml-parser";

export class ReceiptParser {
    constructor() {
        this.parser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: "@_",
            parseAttributeValue: true,
            parseTagValue: true,
            trimValues: true,
        });
    }


    
    parse(xml) {
        try {
            const jsonObj = this.parser.parse(xml);
            
            return jsonObj;
        } catch (error) {
            console.error("Error parsing XML:", error);
            throw error;
        }

        
    }

   
}
