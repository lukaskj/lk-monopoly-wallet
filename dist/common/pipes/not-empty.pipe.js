"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotEmptyPipe = void 0;
const common_1 = require("@nestjs/common");
const is_null_or_undefined_1 = require("../helpers/is-null-or-undefined");
class NotEmptyPipe {
    transform(value, metadata) {
        if ((0, is_null_or_undefined_1.isNullOrEmptyOrUndefined)(value)) {
            throw new common_1.BadRequestException(`${metadata.data} should not be empty`);
        }
        return value;
    }
}
exports.NotEmptyPipe = NotEmptyPipe;
//# sourceMappingURL=not-empty.pipe.js.map