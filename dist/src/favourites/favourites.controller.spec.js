"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const favourites_controller_1 = require("./favourites.controller");
describe('FavouritesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [favourites_controller_1.FavouritesController],
        }).compile();
        controller = module.get(favourites_controller_1.FavouritesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=favourites.controller.spec.js.map