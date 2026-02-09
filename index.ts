import fs from 'fs';
var code:string = fs.readFileSync(process.argv[2], 'utf8');
import {typeChecking} from './compile';

function analyzeCode(code:string):string{
    const lines = code.split('\n');
    lines.forEach((line, index) => {
        const parts = line.split(/:?\s+/);
        if(parts.length === 3){
            const [varName, varType, varValue] = parts;
            const result = typeChecking(varValue, varType);
            if(result.isError){
                throw new Error(`Type error on line ${index + 1}: Expected ${varType} but got value ${varValue}`);
            }
            lines[index] = `${varName} = ${varValue}`
        }  
    });
    return lines.join("\n")
}
let newCode = analyzeCode(code);
fs.writeFileSync(process.argv[2].replace(".trb", "rb"), newCode, {encoding:"utf-8"})
