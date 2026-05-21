import { Tokenizer } from "./Tokenizer.js";

export class CommandInterpreter {

    constructor(input) {

        this.bolding = false;
        this.italicizing = false;
        this.underlining = false;

        this.tokenizer = new Tokenizer(input);

        this.results = [];
    }

    getValue(obj) {
        if (!obj) return null;
        if (typeof obj !== "object") return obj;
        return obj["@_value"] ?? obj.value ?? obj;
    }

    interpret(command) {
        console.log("Interpreting command:", command);

        if (!command || !command.type) return;

        switch (command.type) {

            case 'reciept':
                this.handleReceipt(command);
                break;

            case 'align':
                this.handleAlign(command);
                break;

            case 'text':
                this.handleText(command);
                break;

            case 'bold':
                this.handleBold(command);
                break;

            case 'italic':
                this.handleItalic(command);
                break;

            case 'underline':
                this.handleUnderline(command);
                break;

            case 'newline':
                this.handleNewLine(command);
                break;

            case 'line':
                this.handleLine(command);
                break;

            case 'feed':
                this.handleFeed(command);
                break;

            case 'image':
                this.handleImage(command);
                break;

            case 'barcode':
                this.handleBarCode(command);
                break;

            default:
                console.log("Unknown command type:", command.type);
        }
    }

    handleReceipt(obj) {

    if (!obj) return;

    // Initialize printer
    this.results.push(Buffer.from([0x1B, 0x40]));

    // Interpret nested receipt content
    this.interpret(this.tokenizer.getNextToken());

    // Feed a few lines
    this.results.push(Buffer.from('\n\n\n'));

    // Full cut
    this.results.push(Buffer.from([0x1D, 0x56, 0x00]));
}

    handleAlign(obj) {

        if (!obj) return;

        const value = this.getValue(obj.value);

        let cmd;

        switch (value) {

            case 'LEFT':
                cmd = Buffer.from([0x1B, 0x61, 0x00]);
                break;

            case 'CENTER':
                cmd = Buffer.from([0x1B, 0x61, 0x01]);
                break;

            case 'RIGHT':
                cmd = Buffer.from([0x1B, 0x61, 0x02]);
                break;

            default:
                return;
        }

        this.results.push(cmd);

        this.interpret(this.tokenizer.getNextToken());

        this.results.push(Buffer.from([0x1B, 0x61, 0x00]));
    }



    getText(obj) {
    if (!obj) return null;

    if (typeof obj === "string") return obj;

    if (obj["#text"]) return obj["#text"];

    if (obj.text) return obj.text;

    return null;
}

    handleText(obj) {




  



        if (!obj) return;

        const size = obj.value["@_size"] || "1x1";

        let cmd;

        switch (size) {

            case '1x1':
                cmd = Buffer.from([0x1D, 0x21, 0x00]);
                break;

            case '2x1':
                cmd = Buffer.from([0x1D, 0x21, 0x10]);
                break;

            case '1x2':
                cmd = Buffer.from([0x1D, 0x21, 0x01]);
                break;

            case '2x2':
                cmd = Buffer.from([0x1D, 0x21, 0x11]);
                break;

            default:
                cmd = Buffer.from([0x1D, 0x21, 0x00]);
        }

        if (!obj) return;

 
    this.results.push(cmd);

    const text = this.getText(obj.value);

    if (text) {
        this.results.push(Buffer.from(String(text)));
    }

    this.interpret(this.tokenizer.getNextToken());

    this.results.push(Buffer.from([0x1D, 0x21, 0x00]));
    }

    handleBold(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1B, 0x45, 0x01]));

        this.interpret(this.tokenizer.getNextToken());

        this.results.push(Buffer.from([0x1B, 0x45, 0x00]));
    }

    handleItalic(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1B, 0x34]));

        this.interpret(this.tokenizer.getNextToken());

        this.results.push(Buffer.from([0x1B, 0x35]));
    }

    handleUnderline(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1B, 0x2D, 0x01]));

        this.interpret(this.tokenizer.getNextToken());

        this.results.push(Buffer.from([0x1B, 0x2D, 0x00]));
    }

    handleNewLine(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x0A]));

        this.interpret(this.tokenizer.getNextToken());
    }

    handleLine(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x0A]));

        this.interpret(this.tokenizer.getNextToken());
    }

    handleFeed(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1B, 0x64, 0x01]));

        this.interpret(this.tokenizer.getNextToken());
    }

    handleImage(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1D, 0x76, 0x30]));

        this.interpret(this.tokenizer.getNextToken());
    }

    handleBarCode(obj) {

        if (!obj) return;

        this.results.push(Buffer.from([0x1D, 0x6B]));

        this.interpret(this.tokenizer.getNextToken());
    }

    getResults() {
        this.interpret(this.tokenizer.getNextToken());
        return this.results;
    }

    getRawStream() {
    // 1. Ensure the interpret process has run
    const buffers = this.getResults(); 
    
    // 2. Concatenate all buffers in the results array
    return Buffer.concat(buffers);
}
}