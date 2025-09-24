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
exports.FavouritesController = exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.JwtAuthGuard = JwtAuthGuard;
const prisma_service_1 = require("../prisma/prisma.service");
let FavouritesController = class FavouritesController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getUserFavourites(req) {
        return this.prisma.favourite.findMany({
            where: { userId: req.user.id },
            include: { product: true },
        });
    }
    async addFavourite(req, productId) {
        return this.prisma.favourite.upsert({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId: Number(productId),
                },
            },
            update: {},
            create: {
                userId: req.user.id,
                productId: Number(productId),
            },
        });
    }
    async removeFavourite(req, productId) {
        return this.prisma.favourite.delete({
            where: {
                userId_productId: {
                    userId: req.user.id,
                    productId: Number(productId),
                },
            },
        });
    }
};
exports.FavouritesController = FavouritesController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FavouritesController.prototype, "getUserFavourites", null);
__decorate([
    (0, common_1.Post)(':productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FavouritesController.prototype, "addFavourite", null);
__decorate([
    (0, common_1.Delete)(':productId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FavouritesController.prototype, "removeFavourite", null);
exports.FavouritesController = FavouritesController = __decorate([
    (0, common_1.Controller)('favourites'),
    (0, common_1.UseGuards)(JwtAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FavouritesController);
//# sourceMappingURL=favourites.controller.js.map