import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../src/app';

chai.use(chaiHttp);

describe('Authentication Controller', () => {

  describe('Login', () => {
    describe('success', () => {

      it('Responds with http status(200)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'test@test.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });

      it('Responds with err(null)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'test@test.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(err).to.be.null;
            done();
          });
      });

      it('Responds with res.body(token)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'test@test.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res.body).to.have.property('token');
            done();
          });
      });

      it('Responds with success(true)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'test@test.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res.body.success).to.equal(true);
            done();
          });
      });


    });
    describe('failure', () => {

      it('Responds with http status(401)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'fake@news.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });

      it('Responds with success(false)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'fake@news.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res.body.success).to.equal(false);
            done();
          });
      });

      it('Responds with res.body(!token)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'fake@news.com',
            password: 'test'
          })
          .end((err, res) => {
            expect(res.body).to.not.have.property('token');
            done();
          });
      });

      it('Responds with err(!null)', done => {
        chai.request(server)
          .post('/api/auth/login')
          .send({
            email: 'fake@news.com',
            password: 'test'
          })
          .end((err) => {
            expect(err).to.not.be.null;
            done();
          });
      });



    });
  });

});