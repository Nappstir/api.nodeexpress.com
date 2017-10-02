import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

describe('Authentication Controller', () => {

  describe('login success', () => {
    it('responds with status(200) & json props', done => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          email: 'test@test.com',
          password: 'test'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('token');
          expect(res.body.success).to.equal(true);
          done();
        });
    });
  });

  describe('login failure', () => {
    it('responds with status(401) & json props', done => {
      chai.request(server)
        .post('/api/auth/login')
        .send({
          email: 'fake@news.com',
          password: 'test'
        })
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body.success).to.equal(false);
          done();
        });
    });
  });

});