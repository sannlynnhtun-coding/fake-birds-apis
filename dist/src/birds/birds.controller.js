"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdsController = void 0;
const common_1 = require("@nestjs/common");
const birds_service_1 = require("./birds.service");
const create_bird_dto_1 = require("./dto/create-bird.dto");
const update_bird_dto_1 = require("./dto/update-bird.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BirdsController = class BirdsController {
    birdsService;
    constructor(birdsService) {
        this.birdsService = birdsService;
    }
    findAll() {
        return this.birdsService.findAll();
    }
    findOne(id) {
        return this.birdsService.findOne(id);
    }
    create(createBirdDto) {
        return this.birdsService.create(createBirdDto);
    }
    update(id, updateBirdDto) {
        return this.birdsService.update(id, updateBirdDto);
    }
    patch(id, updateBirdDto) {
        return this.birdsService.update(id, updateBirdDto);
    }
    remove(id) {
        this.birdsService.remove(id);
        return { message: 'Bird deleted successfully' };
    }
};
exports.BirdsController = BirdsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bird_dto_1.CreateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bird_dto_1.UpdateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bird_dto_1.UpdateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BirdsController.prototype, "remove", null);
exports.BirdsController = BirdsController = __decorate([
    (0, common_1.Controller)('birds'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [birds_service_1.BirdsService])
], BirdsController);
//# sourceMappingURL=birds.controller.js.map