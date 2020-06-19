export const mockEmailService = jest.fn().mockImplementation(() => ({
  sendEmail: jest.fn(() => ({
    messageId: '01010172ca36d1fd-92d16c1d-0194-4fb2-81b0-3b7cca02ac81-000000',
  })),
}));
