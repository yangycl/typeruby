import fs from 'fs';
var code:string = fs.readFileSync(process.argv[2], 'utf8');
import {typeChecking} from './compile';
var varreble:Record<string, string> = {}

function analyzeCode(code:string):string{
    const lines = code.split('\n');
    lines.forEach((line, index) => {
        const parts = line.split(/:?\s+/);
        if(parts.length === 3){
            const [varName, varType, varValue] = parts;
            varreble[line.replace(/:[A-z]|[a-z]\s*=\s*.*/, "")] = varType

            const result = typeChecking(varValue, varType);
            if(result.isError){
                throw new Error(`Type error on line ${index + 1}: Expected ${varType} but got value ${varValue}`);
            }
            lines[index] = `${varName} = ${varValue}`
        }else if(Object.keys(varreble).includes(line.replace(/\s*=\s*.*/, ""))){
            const name = line.replace(/\s*=\s*.*/, "").trim()
            const value = (line.match(/\s*=\s*.*/)?.[0] ?? "").replace("=", "").trim();
            const type = varreble[name].trim()
            const result = typeChecking(value, type) 
            if(result.isError){
                throw new Error(`Type error on line ${index + 1}: Expected ${type} but got value ${value}`)
            }
        }
        
    });
    return lines.join("\n")
}
let newCode = analyzeCode(code);
fs.writeFileSync(process.argv[2].replace(".trb", "rb"), newCode, {encoding:"utf-8"})
