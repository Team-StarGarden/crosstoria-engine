import { app } from '../../index';
import request from 'supertest';

describe('POST /register는', () => {
    describe('성공 시', () => {
        it('200을 반환한다', done => {
            request(app)
                .post('/register')
                .send({})
                .expect(200)
                .end(done);
        });
    });
});
