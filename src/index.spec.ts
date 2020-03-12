import { Connection, createConnection } from 'typeorm';

describe('Sample Test', () => {
  let typeormConnection: Connection;

  beforeAll(async () => {
    typeormConnection = await createConnection();
    await typeormConnection.synchronize();
  });

  it('should be run with no error', () => {
    expect({}).toBeInstanceOf(Object);
  });

  it('should connect to DBMS', () => {
    expect(typeormConnection.isConnected).toBeTruthy();
  });

  afterAll(async () => {
    await typeormConnection.close();
  });
});
