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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBirdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class CreateBirdDto {
    BirdMyanmarName;
    BirdEnglishName;
    Description;
    ImagePath;
}
exports.CreateBirdDto = CreateBirdDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bird name in Myanmar language',
        example: 'ငှက်စိမ်းရင်ဝါ',
    }),
    __metadata("design:type", String)
], CreateBirdDto.prototype, "BirdMyanmarName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bird name in English',
        example: 'Orange-bellied Leafbird',
    }),
    __metadata("design:type", String)
], CreateBirdDto.prototype, "BirdEnglishName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Bird description',
        example: 'A beautiful green bird with yellow belly...',
    }),
    __metadata("design:type", String)
], CreateBirdDto.prototype, "Description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Path to bird image (relative to public/birds/)',
        example: 'img/1_Orange-belliedLeafbird.jpg',
    }),
    __metadata("design:type", String)
], CreateBirdDto.prototype, "ImagePath", void 0);
//# sourceMappingURL=create-bird.dto.js.map