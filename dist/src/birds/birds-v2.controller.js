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
exports.BirdsV2Controller = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const birds_service_1 = require("./birds.service");
const create_bird_dto_1 = require("./dto/create-bird.dto");
const update_bird_dto_1 = require("./dto/update-bird.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let BirdsV2Controller = class BirdsV2Controller {
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
exports.BirdsV2Controller = BirdsV2Controller;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all birds (v2 - Auth Required)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all birds' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific bird by ID (v2 - Auth Required)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Bird ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bird details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bird not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new bird (v2 - Auth Required)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Bird created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bird_dto_1.CreateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bird (full update) (v2 - Auth Required)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Bird ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bird updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bird not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bird_dto_1.UpdateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a bird (partial update) (v2 - Auth Required)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Bird ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bird updated successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bird not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_bird_dto_1.UpdateBirdDto]),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "patch", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.Version)('2'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a bird (v2 - Auth Required)' }),
    (0, swagger_1.ApiParam)({ name: 'id', type: 'number', description: 'Bird ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Bird deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Bird not found' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], BirdsV2Controller.prototype, "remove", null);
exports.BirdsV2Controller = BirdsV2Controller = __decorate([
    (0, swagger_1.ApiTags)('birds-v2'),
    (0, swagger_1.ApiBearerAuth)('JWT-auth'),
    (0, common_1.Controller)({ path: 'birds', version: '2' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [birds_service_1.BirdsService])
], BirdsV2Controller);
//# sourceMappingURL=birds-v2.controller.js.map