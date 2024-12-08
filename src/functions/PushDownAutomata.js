class Node {
    constructor(name) {
        this.stateName = name;
        this.input = {}; // Input: State To Traverse
        this.pop = {}; // Input: to pop
        this.push = {}; // Input: to push
    }
}

class PDA {
    constructor() {
        this.stack = []
        this.states = {}
    }

    printStatesMap() {
        for (let key in this.states) {
            console.log(`${key}: ${this.states[key]}`);
        }
    }


    returnPush(NodeName) {
        return this.states[NodeName].push
    }

    returnPop(NodeName) {
        return this.states[NodeName].pop
    }

    returnTraverseNode(NodeName) {
        return this.states[NodeName].input
    }

    editPush(NodeName, newPush) {
        const NodeState = this.states[NodeName];
        NodeState.push = newPush
        console.log(NodeState)
    }

    printStateInfos() {
        for (let key in this.states) {
            const state = this.states[key]
            console.log("Node Details:");
            console.log("------------->");
            console.log(`State Name: ${state.stateName}`);
            console.log("-------------=");
            console.log(`Input: ${JSON.stringify(state.input)}`);
            console.log(`Pop: ${JSON.stringify(state.pop)}`);
            console.log(`Push: ${JSON.stringify(state.push)}`);
            console.log("------------->");
            console.log("\n");
        }
    }

    addState(stateName, node) {
        this.states[stateName] = node
    }

    addStateCondition(stateName, input, pop, push){
        const Node = this.states[stateName];

        Node.input = input;
        Node.pop = pop;
        Node.push = push;
    }

    addEmptyCharacter(stringInput, isPalindrome) {
        if (isPalindrome) {
            const middleIndex = Math.floor(stringInput.length / 2);
            return 'e' + stringInput.slice(0, middleIndex) + " " + stringInput.slice(middleIndex) + 'e';
        }
        return 'e' + stringInput + 'e';
    }

    validateResult(stringInput, autoReject) {
        if (this.stack.length === 0 && !autoReject) {
            console.log(`String = "${stringInput}" Reaches Final State (Accepted)`)
        } else {
            console.log(`String = "${stringInput}" Failed To Reach Final State With Stack Not Empty (REJECTED)`)
        }

        this.stack = []
    }

    validatePopper(stackFront, toPop) {
        // If array (if need to pop twice)
        if (Array.isArray(toPop)) {
            for (let item of toPop) {
                if (!this.validatePopper(stackFront, item)) {
                    return false;
                }
            }
            return true;
        }


        // Pop
        if (stackFront !== null && toPop !== null && stackFront === toPop) {
            this.stack.pop();
        } else if (stackFront === null && toPop !== null) {
            return true;
        } else if (stackFront !== null && toPop !== null && stackFront !== toPop) {
            return true;
        }
    }

    validatePusher(toPush) {
        if (Array.isArray(toPush)) {
            // Push each element in the array
            for (let item of toPush) {
                if (item !== null) {
                    this.stack.push(item);
                }
            }
        } else if (toPush !== null) {
            // Push single non-null value
            this.stack.push(toPush);
        }
    }

    validateInput(stringInput, isPalindrome) {
        const string = this.addEmptyCharacter(stringInput, isPalindrome);
        let currentState = this.states["Q0"]
        let autoReject = false;
        
        console.log("Transition Table:");
        console.log("-------------------------------------------------------------------------");
        console.log("| Current State  | Input | Action     | Stack State        | Next State |");
        console.log("-------------------------------------------------------------------------");

        for (const char of string)  {
           
            let toPop = currentState.pop?.[char] ?? null;
            let toPush = currentState.push?.[char] ?? null;
            let stackFront = this.stack[this.stack.length - 1] ?? null;
            
            // Pop
            autoReject = this.validatePopper(stackFront, toPop)
            if (autoReject) { break; }

            // Push
            this.validatePusher(toPush)

            let traverseLocation = currentState.input?.[char] ?? null;
            
            // Determine action
            let action = "";
            if (toPop && toPush) {
                action = `Pop ${toPop}, Push ${toPush}`;
            } else if (toPop) {
                action = `Pop ${toPop}`;
            } else if (toPush) {
                action = `Push ${toPush}`;
            } else {
                action = "No action";
            }

            // Transition to next state
            const nextStateName = traverseLocation !== null ? traverseLocation : currentState.stateName;

            // Stack representation
            const stackRepresentation = `${this.stack[this.stack.length - 1] ?? "Empty"},${this.stack[this.stack.length - 2] ?? ""}`;


            // Log transition
            console.log(`| ${currentState.stateName.padEnd(14)} | ${char.padEnd(5)} | ${action.padEnd(10)} | ${stackRepresentation.padEnd(18)} | ${nextStateName.padEnd(10)} |`);
            

            if (traverseLocation !== null){    
                currentState = this.states[traverseLocation]
            }


            
        }

        this.validateResult(stringInput, autoReject);
       
    }

    
}

const PushDownAutomataInstance = new PDA()

export {PushDownAutomataInstance, Node}





