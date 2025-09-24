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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductController = class ProductController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRelated(id) {
        const product = await this.prisma.product.findUnique({
            where: { id: Number(id) },
        });
        if (!product)
            return [];
        const results = await this.prisma.product.findMany({
            where: {
                categoryId: product.categoryId,
                NOT: { id: product.id },
            },
            take: 4,
        });
        console.log(results);
        return results;
    }
    async getProduct(id) {
        const productId = Number(id);
        if (isNaN(productId)) {
            return null;
        }
        return this.prisma.product.findUnique({
            where: { id: productId },
        });
    }
    async search(q) {
        if (!q || q.trim() === '') {
            return [];
        }
        return this.prisma.product.findMany({
            where: {
                OR: [
                    { title: { contains: q, mode: 'insensitive' } },
                    { author: { contains: q, mode: 'insensitive' } },
                ],
            },
            take: 5,
            select: { id: true, title: true },
            orderBy: { title: 'asc' },
        });
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, common_1.Get)('products/:id/related'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getRelated", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProduct", null);
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "search", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductController);
//# sourceMappingURL=product.controller.js.map