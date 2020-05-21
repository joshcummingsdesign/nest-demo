import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

describe('CatsController', () => {
  let app: TestingModule;
  let catsController: CatsController;
  const cat: Cat = {
    name: 'Ace',
    age: 10,
    breed: 'Domestic Shorthair',
  };

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    catsController = app.get<CatsController>(CatsController);
  });

  describe('createCat', () => {
    it('should create a cat', () => {
      expect(catsController.createCat(cat)).toEqual(cat);
    });
  });

  describe('getAllCats', () => {
    it('should return a list of cats', () => {
      expect(catsController.getAllCats()).toEqual([cat]);
    });
  });

  describe('getCat', () => {
    it('should return a cat by id', () => {
      expect(catsController.getCat('Ace')).toEqual(cat);
    });
  });
});
