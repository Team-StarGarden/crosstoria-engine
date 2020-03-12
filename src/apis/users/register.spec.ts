import { app } from '../../index';
import request from 'supertest';
import { InsertResult } from 'typeorm';
import { insertUser } from './user.func';

jest.mock('./user.func', () => ({
  insertUser: jest.fn(() => {
    return Promise.resolve(new InsertResult());
  }),
}));

describe('POST /register는', () => {
  describe('성공 시', () => {
    // eslint-disable-next-line jest/expect-expect
    it('200을 반환한다', () => {
      request(app)
      .post('/api/users/register')
      .send({
        email: 'sample@googoo.com',
        age: 17,
        userName: 'Googoo',
      })
      .expect(200)
      .end();
    });
  });
  describe('실패 시', () => {
    // eslint-disable-next-line jest/expect-expect
    it('나이가 2*10^9 이하의 자연수가 아닐 경우 400을 반환한다', () => {
      (insertUser as jest.Mock).mockImplementation(() => {
        return Promise.resolve(new InsertResult());
      });

      request(app)
      .post('/api/users/register')
      .send({
        email: 'sample@googoo.com',
        age: 10000000 * 10000000,
        userName: 'Googoo',
      })
      .expect(400)
      .end();
    });

    // eslint-disable-next-line jest/expect-expect
    it('형식이 불완전할 경우 400을 반환한다', () => {
      (insertUser as jest.Mock).mockImplementation(() => {
        return Promise.resolve(new InsertResult());
      });

      request(app)
      .post('/api/users/register')
      .send({
        email: 'sample@googoo.com',
        userName: 'Googoo',
      })
      .expect(400)
      .end();
    });

    // eslint-disable-next-line jest/expect-expect
    it('이메일이 이미 등록되어 있을 경우 409을 반환한다', () => {
      (insertUser as jest.Mock).mockImplementation(() => {
        return Promise.reject(new Error('ER_DUP_ENTRY'));
      });

      request(app)
      .post('/api/users/register')
      .send({
        email: 'sample@googoo.com',
        age: 17,
        userName: 'Googoo',
      })
      .expect(409)
      .end();
    });

    // eslint-disable-next-line jest/expect-expect
    it('알 수 없는 에러의 경우 451을 반환한다', () => {
      (insertUser as jest.Mock).mockImplementation(() => {
        return Promise.reject(new Error('ER_INVALID'));
      });

      request(app)
      .post('/api/users/register')
      .send({
        email: 'sample@googoo.com',
        age: 17,
        userName: 'Googoo',
      })
      .expect(451)
      .end();
    });
  });
});
