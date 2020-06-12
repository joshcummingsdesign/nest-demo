import { isPassword } from './is-password';

describe('isPassword', () => {
  it('rejects passwords that are too short', () => {
    expect(isPassword('No1!')).toEqual(false);
  });

  it('rejects passwords without uppercase', () => {
    expect(isPassword('thisisnotallowed1!')).toEqual(false);
  });

  it('rejects passwords without lowercase', () => {
    expect(isPassword('THISISNOTALLOWED1!')).toEqual(false);
  });

  it('rejects passwords without number', () => {
    expect(isPassword('Thisisnotallowed!@')).toEqual(false);
  });

  it('rejects passwords without symbol', () => {
    expect(isPassword('Thisisnotallowed12')).toEqual(false);
  });

  it('rejects passwords that are too long', () => {
    expect(
      isPassword(
        'Thispasswordistoolongandthereforeisnotallowedbyanymeansokmanseriously!@1',
      ),
    ).toEqual(false);
  });

  it('accepts a valid password', () => {
    expect(isPassword('This is allowed1!')).toEqual(true);
    expect(isPassword('Thisisallowed23@!')).toEqual(true);
    expect(isPassword('123Thisisallowed23@!')).toEqual(true);
  });
});
