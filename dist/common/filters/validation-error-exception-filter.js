"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ValidationErrorExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationErrorExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let ValidationErrorExceptionFilter = exports.ValidationErrorExceptionFilter = ValidationErrorExceptionFilter_1 = class ValidationErrorExceptionFilter extends common_1.ValidationPipe {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger(ValidationErrorExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = common_1.HttpStatus.BAD_REQUEST;
        const message = this.flattenValidationErrors(exception);
        const error = "Bad Request";
        const json = {
            statusCode,
            message,
            error,
        };
        this.logger.error([json, exception]);
        response.status(statusCode).json(json);
    }
};
exports.ValidationErrorExceptionFilter = ValidationErrorExceptionFilter = ValidationErrorExceptionFilter_1 = __decorate([
    (0, common_1.Catch)((Array))
], ValidationErrorExceptionFilter);
//# sourceMappingURL=validation-error-exception-filter.js.map