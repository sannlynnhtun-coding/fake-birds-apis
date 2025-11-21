"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BirdsService = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
let BirdsService = class BirdsService {
    birds = [];
    nextId = 1;
    constructor() {
        const jsonPath = path.join(process.cwd(), 'public', 'birds', 'birds.json');
        const jsonData = fs.readFileSync(jsonPath, 'utf8');
        this.birds = JSON.parse(jsonData);
        if (this.birds.length > 0) {
            this.nextId = Math.max(...this.birds.map((b) => b.Id)) + 1;
        }
    }
    transformBird(bird) {
        return {
            ...bird,
            ImagePath: `/public/birds/${bird.ImagePath}`,
        };
    }
    findAll() {
        return this.birds.map((bird) => this.transformBird(bird));
    }
    findOne(id) {
        const bird = this.birds.find((b) => b.Id === id);
        if (!bird) {
            throw new common_1.NotFoundException(`Bird with ID ${id} not found`);
        }
        return this.transformBird(bird);
    }
    create(createBirdDto) {
        const newBird = {
            Id: this.nextId++,
            ...createBirdDto,
        };
        this.birds.push(newBird);
        return this.transformBird(newBird);
    }
    update(id, updateBirdDto) {
        const birdIndex = this.birds.findIndex((b) => b.Id === id);
        if (birdIndex === -1) {
            throw new common_1.NotFoundException(`Bird with ID ${id} not found`);
        }
        this.birds[birdIndex] = {
            ...this.birds[birdIndex],
            ...updateBirdDto,
        };
        return this.transformBird(this.birds[birdIndex]);
    }
    remove(id) {
        const birdIndex = this.birds.findIndex((b) => b.Id === id);
        if (birdIndex === -1) {
            throw new common_1.NotFoundException(`Bird with ID ${id} not found`);
        }
        this.birds.splice(birdIndex, 1);
    }
};
exports.BirdsService = BirdsService;
exports.BirdsService = BirdsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BirdsService);
//# sourceMappingURL=birds.service.js.map