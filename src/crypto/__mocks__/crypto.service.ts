export const mockCryptoService = jest.fn().mockImplementation(() => ({
  hashPassword: jest.fn(() =>
    Promise.resolve(
      '$2b$10$bsuCbr.t7wrVe5Cf2cPcMuBoIivSHyag1TVSYHtg1ihjE.MHefxwG',
    ),
  ),
  comparePassword: jest.fn(() => Promise.resolve(true)),
}));
