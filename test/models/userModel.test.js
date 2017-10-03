import { expect } from 'chai';
import * as User from '../../src/models/userModels';

describe('User Model', () => {

  describe('#getUser', () => {
    describe('success', () => {
      const req = {params: {id: 1}};

      it('Responds with object', done => {
        User.getUser(req)
          .then((res) => {
            expect(res).to.be.an('object');
            done();
          });
      });

      it('Responds with res.id = req.params.id', done => {
        User.getUser(req)
          .then((res) => {
            expect(res.id).to.be.equal(req.params.id);
            done();
          });
      });

      it('Responds with res.first_name = admin', done => {
        User.getUser(req)
          .then((res) => {
            expect(res.first_name).to.be.equal('admin');
            done();
          });
      });

    });
    describe('failure', () => {
      const req = {params: {id: 4}};

      it('Responds with err(null)', done => {
        User.getUser(req)
          .then((err, res) => {
            expect(err).to.not.be.null;
            done();
          });
      });

    });
  });


});