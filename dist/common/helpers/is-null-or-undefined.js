"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNullOrEmptyOrUndefined = exports.isNullOrUndefined = void 0;
const isNullOrUndefined = (value) => value === null || value === undefined;
exports.isNullOrUndefined = isNullOrUndefined;
function isNullOrEmptyOrUndefined(value) {
    return value === undefined || value === null || value === "" || value.toString().trim() === "";
}
exports.isNullOrEmptyOrUndefined = isNullOrEmptyOrUndefined;
//# sourceMappingURL=is-null-or-undefined.js.map