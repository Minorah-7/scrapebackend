"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const favourites_service_1 = require("./favourites.service");
describe('FavouritesService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [favourites_service_1.FavouritesService],
        }).compile();
        service = module.get(favourites_service_1.FavouritesService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=favourites.service.spec.js.map