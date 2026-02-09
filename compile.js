"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeChecking = typeChecking;
function typeChecking(value, type) {
    switch (type) {
        case "Integer":
            return {
                isError: !(/^\d+\.?\d*$/.test(value)),
                type: type
            };
        case "String":
            return {
                isError: !(/("|').*?("|')/.test(value)),
                type: type
            };
        case "Boolean":
            return {
                isError: !(/true|false/.test(value)),
                type: type
            };
        case "Array":
            return {
                isError: !(/\[.*\]/.test(value)),
                type: type
            };
        case "Hash":
            return {
                isError: !(/\{.*\}/.test(value)),
                type: type
            };
        default:
            return {
                isError: true,
                type: type
            };
    }
}
