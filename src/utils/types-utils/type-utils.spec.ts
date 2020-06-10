import { getEnumKeys } from '.';

describe('type utilities', () => {
  describe('getEnumKeys', () => {
    it('should return they keys of an enum', () => {
      enum ESomeEnum {
        'mary',
        'john',
        'steve',
      }
      expect(getEnumKeys(ESomeEnum)).toEqual(['mary', 'john', 'steve']);
    });
  });
});
