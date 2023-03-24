const Secret = require('../domain/secret/Secret');
const DeleteSecret = require('../application/delete_secret');

describe('Delete Secret', () => {
  let deleteSecret;
  const secretRepositoryMock = {
    delete: jest.fn(),
    findById: jest.fn(),
  };
  const cipherMock = {decrypt: jest.fn()};

  beforeEach(() => {
    deleteSecret = new DeleteSecret({
      secretRepository: secretRepositoryMock,
      cipher: cipherMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should delete secret', async ()=> {
    const date = new Date();
    const expireAt = 6000;

    const secretToDelete = new Secret({
      id: '11',
      secret: 'zz',
      iv: '444',
      expireAt: new Date(date.getTime() + expireAt * 60000),
      createdAt: date,
      updatedAt: date,
    });

    secretRepositoryMock.findById.mockReturnValue(secretToDelete);

    await deleteSecret.execute({id: '11', secretKey: 'sad'});

    expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.findById).toHaveBeenCalledWith('11');
    expect(secretRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.delete).toHaveBeenCalledWith('11');
    expect(cipherMock.decrypt).toHaveBeenCalledWith({content: 'zz', iv: '444', secretKey: 'sad'});
    expect(cipherMock.decrypt).toHaveBeenCalledTimes(1);
  });

  test('should throw error when trying to dleeta secret that not exists', async ()=> {
    secretRepositoryMock.findById.mockReturnValue(null);

    await (expect(deleteSecret.execute({id: '11', token: 'token'}))).rejects.toThrow(Error);

    expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.findById).toHaveBeenCalledWith('11');
    expect(secretRepositoryMock.delete).not.toHaveBeenCalled();
    expect(cipherMock.decrypt).toHaveBeenCalledTimes(0);
  });
});
