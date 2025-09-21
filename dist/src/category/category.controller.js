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
exports.CategoryController = void 0;
const common_1 = require("@nestjs/common");
const category_service_1 = require("./category.service");
const prisma_service_1 = require("../prisma/prisma.service");
let CategoryController = class CategoryController {
    constructor(categoryService, prisma) {
        this.categoryService = categoryService;
        this.prisma = prisma;
    }
    async getCategories(slug) {
        return this.categoryService.getCategoriesByNavigationSlug(slug);
    }
    async getProducts(id, page = '1', limit = '10') {
        return this.categoryService.getProductsByCategoryId(parseInt(id, 10), parseInt(page, 10), parseInt(limit, 10));
    }
    async getProduct(id) {
        return this.prisma.product.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                detail: true,
                reviews: true,
            },
        });
    }
};
exports.CategoryController = CategoryController;
__decorate([
    (0, common_1.Get)('navigation/:slug/categories'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Get)('categories/:id/products'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoryController.prototype, "getProduct", null);
exports.CategoryController = CategoryController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [category_service_1.CategoryService,
        prisma_service_1.PrismaService])
], CategoryController);
//# sourceMappingURL=category.controller.js.map