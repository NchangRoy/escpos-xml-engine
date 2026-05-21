import { ReceiptParser } from "./ReceiptParser.js"
import { CommandInterpreter } from "./CommandInterpreter.js"
export class EPOSInterpreter{

    constructor(input){
        
        this.receiptParser=new ReceiptParser()
        const json=this.receiptParser.parse(input)
        this.commandInterpreter=new CommandInterpreter(json)
        this.results=this.commandInterpreter.getRawStream();
        
    }
    
    getEPOS(){
        return this.results
    }
}