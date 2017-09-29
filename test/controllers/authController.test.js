import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

describe('Authentication Controller', () => {

  const testUser = {
    email_address: 'test@test.com',
    password: 'test'
  };

  describe('login success', () => {
    it('responds with status 200', done => {
      chai.request(server)
        .post('/api/auth/login')
        .send(testUser)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('login failure', () => {
    it('responds with status 401', done => {
      chai.request(server)
        .post('/api/auth/login')
        .send(testUser.password['testing'])
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

});