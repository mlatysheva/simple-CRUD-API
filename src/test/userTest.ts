process.env.NODE_ENV = 'test';
import users from '../../users.json';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {

  // Consts
  const id = users[0].id,
    successCode = 200,
    numUsers = users.length,
    user = {
      username: users[0].username,
      age: users[0].age,
      hobbies: users[0].hobbies,
    },
    testUsername = 'polina',
    testFields = { age: 15, hobbies: []};

  /*
  * Test for /GET
  */

  describe('/GET users', () => {
    it('it should GET all users', done => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(numUsers);
          done();
        });
    });
  });

  /*
  * Test for /POST
  */

  describe('/POST a new user', () => {
    it('it should POST a new user ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('age');
          res.body.should.have.property('hobbies');
          res.body.should.have.property('id');
          done();
        });
    });
  });

  /*
  * Test for /GET:id
  */

  describe('/GET/:id user', () => {
    it('it should GET a user by the given id', done => {
      chai.request(server)
        .get(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('age');
          res.body.should.have.property('hobbies');
          res.body.should.have.property('username').eql(testUsername);
          done();
        });
    });
  });
  /*
  * Test for /PUT:id
  */
  describe('/PUT/:id user', () => {
    it('it should UPDATE the user with the given id', done => {
      chai.request(server)
        .put(`/api/users/${id}`)
        .send(testFields)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(id);
          res.body.should.have.property('username').eql(testUsername);
          res.body.should.have.property('hobbies').eql(testFields.hobbies);
          res.body.should.have.property('age').eql(testFields.age);
          done();
        });
    });
  });

  /*
  * Test for /DELETE:id
  */
  describe('/DELETE/:id user', () => {
    it('it should DELETE the user with the given id', done => {
      chai.request(server)
        .delete(`/api/users/${id}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`User ${id} removed.`);
          done();
        });
    });
  });
});
