
import { EPOSInterpreter } from "./EPOSInterpreter.js";
import net from "net"


const testXML = `
<reciept>
      
    <align value="CENTER">
      <bold><text size="2x1">POS TERMINAL</text></bold>
      <newline/>
      <text size="1x1">123 Commerce St.</text>
      <newline/>
      <text size="1x1"></text>
      <newline/>
      <text size="1x1">Terminal: TERM-001 (Main Counter)</text>
      <newline/>
      <text size="1x1">Receipt #443576</text>
      <newline/>
      <text size="1x1">5/21/2026 10:01:42 AM</text>
      <newline/>
    </align>
  
      <align value="LEFT"><text size="1x1">----------------------------------------</text></align>
      <newline/>
      
      <align value="LEFT">
        <bold><text size="1x1">Riz 25kg</text></bold>
        <newline/>
        <text size="1x1">1 x $18000.00                  $18000.00</text>
        <newline/>
    </align>
      
    <align value="LEFT">
      <text size="1x1">----------------------------------------</text>
      <newline/>
      <text size="1x1">Subtotal (Excl. Tax)           $18000.00</text>
      <newline/>
      <text size="1x1">Tax (18%)                       $3240.00</text>
      <newline/>
      <bold><text size="1x1">Total (Incl. Tax)              $21240.00</text></bold>
      <newline/>
    </align>
  
      
      <align value="LEFT">
        <text size="1x1">----------------------------------------</text>
        <newline/>
        <text size="1x1">Payment Method                      CARD</text>
        <newline/>
    </align>
      
    <align value="CENTER">
      <text size="1x1">----------------------------------------</text>
      <newline/>
      <text size="1x1">Thank you for your business!</text>
      <newline/>
      <text size="1x1">Please come again.</text>
      <newline/>
      <text size="1x1">Served by: alice_smith</text>
      <newline/>
    </align>
  
      
    </reciept>
`
const interpreter=new EPOSInterpreter(testXML)

const commands=interpreter.getEPOS()



const client = net.createConnection({
    host: '127.0.0.1',
    port: 9100
}, () => {

    console.log('Connected to emulator');

    const stream =commands

    console.log(stream.toString('hex'));

    client.write(stream);o

    client.end();

    console.log('ESC/POS data sent');
});

client.on('error', (err) => {
    console.error('Connection error:', err.message);
});