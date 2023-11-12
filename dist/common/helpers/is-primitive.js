"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPrimitive = void 0;
function isPrimitive(value) {
    return (typeof value !== "object" && typeof value !== "function") || value === null || value instanceof Date;
}
exports.isPrimitive = isPrimitive;
//# sourceMappingURL=is-primitive.js.map