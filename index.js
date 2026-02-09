"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
var code = fs_1.default.readFileSync(process.argv[2], 'utf8');
const compile_1 = require("./compile");
function analyzeCode(code) {
    const lines = code.split('\n');
    lines.forEach((line, index) => {
        const parts = line.split(/:?\s+/);
        if (parts.length === 3) {
            const [varName, varType, varValue] = parts;
            const result = (0, compile_1.typeChecking)(varValue, varType);
            if (result.isError) {
                throw new Error(`Type error on line ${index + 1}: Expected ${varType} but got value ${varValue}`);
            }
            lines[index] = `${varName} = ${varValue}`;
        }
    });
    return lines.join("\n");
}
let newCode = analyzeCode(code);
fs_1.default.writeFileSync(process.argv[2].replace(".trb", "rb"), newCode, { encoding: "utf-8" });
