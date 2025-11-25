"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdsModule = void 0;
const common_1 = require("@nestjs/common");
const birds_v1_controller_1 = require("./birds-v1.controller");
const birds_v2_controller_1 = require("./birds-v2.controller");
const birds_service_1 = require("./birds.service");
let BirdsModule = class BirdsModule {
};
exports.BirdsModule = BirdsModule;
exports.BirdsModule = BirdsModule = __decorate([
    (0, common_1.Module)({
        controllers: [birds_v1_controller_1.BirdsV1Controller, birds_v2_controller_1.BirdsV2Controller],
        providers: [birds_service_1.BirdsService],
    })
], BirdsModule);
//# sourceMappingURL=birds.module.js.map