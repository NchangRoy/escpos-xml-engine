# 🧾 EPOS XML Interpreter (ESC/POS Engine)

A lightweight **Node.js** engine that converts **XML receipt definitions** into raw **ESC/POS** commands and sends them directly to thermal printers or ESC/POS emulators via TCP.

---

## 🚀 Overview

This project allows you to design structured receipts using a simple XML DSL. The interpreter converts the XML into a byte stream of ESC/POS commands that can be sent directly to any compatible thermal printer.

### Flow

```mermaid
flowchart TD
    A[XML Receipt] --> B[EPOSInterpreter]
    B --> C[ESC/POS Command Stream]
    C --> D[TCP Printer<br/>127.0.0.1:9100]

📄 Example XML
XML<receipt>
    <align value="LEFT">
        <bold>
            <text size="1x1">Hello, World1!</text>
        </bold>
        <newline/>
    </align>

    <align value="RIGHT">
        <bold>
            <italic>
                <text size="2x1">Hello, World2!</text>
            </italic>
        </bold>
        <newline/>
    </align>
</receipt>

⚙️ How to Use
1. Installation
Bashnpm install 
2. Basic Usage
JavaScriptimport { EPOSInterpreter } from "./EPOSInterpreter.js";
import net from "net";

const xml = `
<receipt>
    <align value="LEFT">
        <bold>
            <text size="1x1">Hello, World1!</text>
        </bold>
        <newline/>
    </align>

    <align value="RIGHT">
        <bold>
            <italic>
                <text size="2x1">Hello, World2!</text>
            </italic>
        </bold>
        <newline/>
    </align>
</receipt>
`;

const interpreter = new EPOSInterpreter(xml);
const commands = interpreter.getEPOS();

// Send to printer
const client = net.createConnection({ host: "127.0.0.1", port: 9100 }, () => {
    console.log("✅ Connected to printer");
    console.log("Commands (hex):", commands.toString("hex"));

    client.write(commands);
    client.end();

    console.log("🖨️ ESC/POS data sent");
});

client.on("error", (err) => {
    console.error("❌ Connection error:", err.message);
});

🔥 Features

✅ Clean XML-based receipt DSL
✅ Full ESC/POS command generation
✅ Text alignment (LEFT, CENTER, RIGHT)
✅ Text styling: Bold, Italic
✅ Font scaling (1x1, 2x1, 2x2, etc.)
✅ Direct TCP printing (port 9100)
✅ Lightweight and dependency-free


🖨️ Supported ESC/POS Commands





































FeatureESC/POS CommandInitializeESC @AlignmentESC a nBoldESC EItalicESC 4 / ESC 5Font SizeGS ! nLine FeedLFPaper CutGS V 0

⚠️ Important Notes

ESC/POS is state-based — alignment, size, and styles persist until changed.
Always include line breaks (<newline/> or manual LF).
Always send a cut command at the end for proper receipt handling.
Your printer/emulator should be listening on 127.0.0.1:9100 (or configured IP/port).


🧪 Running the Example
Bashnode index.js
Expected Output
textHello, World1!
                           Hello, World2!

Roadmap (Optional)

Support for images (<image>)
QR codes and barcodes
Tables and itemized lists
Custom fonts and character encoding
Printer status checking
