"use strict";
BigInt.prototype.toJSON = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
};
//# sourceMappingURL=bigint-transform-fix.js.map