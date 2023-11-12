"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializeInterceptor = void 0;
const class_transformer_1 = require("class-transformer");
const rxjs_1 = require("rxjs");
class SerializeInterceptor {
    constructor(serializeTo) {
        this.serializeTo = serializeTo;
    }
    intercept(_context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            return (0, class_transformer_1.plainToInstance)(this.serializeTo, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.SerializeInterceptor = SerializeInterceptor;
//# sourceMappingURL=serialize-interceptor.js.map