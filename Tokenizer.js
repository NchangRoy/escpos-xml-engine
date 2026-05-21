export class Tokenizer{
    constructor(input){
        this.input=input;
        this.position=0;
        this.tokens=[]
        this.counter=0

        this.traverseDepthFirst(input);
        
    }
    getNextToken(){
        return this.tokens[this.position++];
    }

    getTokens(){
        return this.tokens;
    }

   traversePostOrder(node) {
    if (node == null) return;

    // 1. Handle primitive values (leaf nodes)
    if (typeof node !== "object") {
        this.tokens.push({
            type: "text",
            value: node,
            nodeId: this.counter++
        });
        return;
    }

    // 2. Handle Arrays (Crucial Fix)
    if (Array.isArray(node)) {
        node.forEach(item => this.traversePostOrder(item));
        return; 
    }

    // 3. Handle Objects
    Object.entries(node).forEach(([key, value]) => {
        console.log("Visiting node:", { key, value });
        // Skip attributes
        if (key.startsWith("@") || key.startsWith("#")) return;

        // Recurse first
        this.traversePostOrder(value);

        // Push current node - If value is an array, we've already 
        // processed its children, but we still need to represent 
        // the tag itself for each instance.
        if (Array.isArray(value)) {
            console.log(`Handling array for key: ${key} with ${value.length} items.`);
            value.forEach(item => {
                this.tokens.push({
                    type: key,
                    value: item,
                    nodeId: this.counter++
                });
            });

        } else {
            this.tokens.push({
                type: key,
                value: value,
                nodeId: this.counter++
            });
        }
    });
}


   traverseDepthFirst(node) {
    if (node == null) return;

    // 1. Handle primitive values (The actual text content)
    if (typeof node !== "object") {
        this.tokens.push({
            type: "text",
            value: node,
            nodeId: this.counter++
        });
        return;
    }

    // 2. Handle Objects
    Object.entries(node).forEach(([key, value]) => {
        // Skip metadata/attributes (they are accessed via the node itself)
        if (key.startsWith("@") || key.startsWith("#")) return;

        if (Array.isArray(value)) {
            // Unroll the array: Create a separate node for every item
            value.forEach(item => {
                this.tokens.push({
                    type: key,
                    value: item,
                    nodeId: this.counter++
                });
                // Recurse into the children of this specific array item
                this.traverseDepthFirst(item);
            });
        } else {
            // Standard Pre-order: Push Parent, then Recurse
            this.tokens.push({
                type: key,
                value: value,
                nodeId: this.counter++
            });
            this.traverseDepthFirst(value);
        }
    });
}


}