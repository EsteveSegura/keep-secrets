const CreateSession = require('../../../application/create_session');


describe('Create Session', () => {
  let createSession;
  const jwtMock = {
    sign: jest.fn(),
  };
  const idGeneratorMock = {
    generate: jest.fn(),
  };

  beforeEach(() => {
    Date.now = jest.fn(() => 1487076708000);
    createSession = new CreateSession({
      jwt: jwtMock,
      idGenerator: idGeneratorMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should create sessions', async ()=> {
    const expectedToken = 'bla';
    jwtMock.sign.mockReturnValue(expectedToken);
    idGeneratorMock.generate.mockReturnValue('id');

    const token = await createSession.execute({aud: 'web'});

    expect(jwtMock.sign).toHaveBeenCalledTimes(1);
    expect(jwtMock.sign).toHaveBeenCalledWith({
      iat: 1487076708000,
      exp: 1487163108000,
      scope: 'read write',
      sub: 'id',
      aud: 'web',
    }, 'MySuperSecret');
    expect(token).toEqual({'accessToken': 'bla'});
  });

  test('should throw error when trying to create token with invalid client', async ()=> {
    const expectedToken = 'bla';
    jwtMock.sign.mockReturnValue(expectedToken);
    idGeneratorMock.generate.mockReturnValue('id');

    await (expect(createSession.execute({aud: 'WRONG'}))).rejects.toThrow(Error);

    expect(jwtMock.sign).toHaveBeenCalledTimes(0);
  });
});
