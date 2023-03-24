const Secret = require('../domain/secret/Secret');
const SaveSecret = require('../application/save_secret');

const MOCK_DATE_STRING = '2022-06-30T20:28:10.001Z';
const mockDate = new Date(MOCK_DATE_STRING);

jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

describe('Save Secret', () => {
  const secretRepositoryMock = {save: jest.fn(), findById: jest.fn()};
  const idGeneratorMock = {generate: jest.fn()};
  const cipherMock = {encrypt: jest.fn()};
  const garbageCollectorMock = {run: jest.fn()};

  beforeEach(() => {
    saveSecretMock = new SaveSecret({
      idGenerator: idGeneratorMock,
      secretRepository: secretRepositoryMock,
      cipher: cipherMock,
      garbageCollector: garbageCollectorMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should save a secret', async () => {
    const date = new Date();
    const payload = 'SuperSECRET';
    const expireAt = 6000;

    idGeneratorMock.generate.mockReturnValue('111133333');
    secretRepositoryMock.findById.mockReturnValue(null);
    cipherMock.encrypt.mockReturnValue({
      iv: '444',
      secretKey: 'asdbujiasdfbuiag',
      secret: 'ioqwerbioergnioeniooninioerg',
    });

    const secretToSave = new Secret({
      id: '111133333',
      secret: 'ioqwerbioergnioeniooninioerg',
      token: 'qngionqiowefnqwe',
      iv: '444',
      expireAt: new Date(date.getTime() + expireAt * 60000),
      createdAt: date,
      updatedAt: date,
    });

    await saveSecretMock.execute({payload, expireAt});

    expect(secretRepositoryMock.save).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.save).toHaveBeenCalledWith(secretToSave);
    expect(cipherMock.encrypt).toHaveBeenCalledTimes(1);
    expect(cipherMock.encrypt).toHaveBeenCalledWith('SuperSECRET');
    expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.findById).toHaveBeenCalledWith('111133333');
    expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);
    expect(garbageCollectorMock.run).toHaveBeenCalledTimes(1);
  });

  test('should error when secret id already exists', async () => {
    const payload = 'SuperSECRET';
    const expireAt = 6000;

    idGeneratorMock.generate.mockReturnValue('111133333');
    secretRepositoryMock.findById.mockReturnValue(true);

    await (expect(saveSecretMock.execute({payload, expireAt}))).rejects.toThrow(new Error('Secret id already exists'));

    expect(secretRepositoryMock.save).toHaveBeenCalledTimes(0);
    expect(cipherMock.encrypt).toHaveBeenCalledTimes(0);
    expect(secretRepositoryMock.findById).toHaveBeenCalledTimes(1);
    expect(secretRepositoryMock.findById).toHaveBeenCalledWith('111133333');
    expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);
    expect(garbageCollectorMock.run).toHaveBeenCalledTimes(0);
  });
});
