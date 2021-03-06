import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { assert, should } = chai;
should();

describe('--- Catch all routes ----', () => {
    describe('all routes', () => {
        it('On success:: send welcome message', (done) => {
            chai
                .request(app)
                .get('/')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.status, 'fail');
                    assert.equal(res.body.message, 'Sorry, the page you seek does not exist');
                    done();
                });
        });
    });
});

describe('--- Rides route testing ----', () => {
    describe('/rides: GET', () => {
        it('On success:: Get all ride offers', (done) => {
            chai
                .request(app)
                .get('/api/v1/rides')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.status, 'success');
                    assert.isArray(res.body.data);
                    done();
                });
        });
    });
    describe('/rides/<rideId>: GET', () => {
        it('On success:: return a ride', (done) => {
            chai
                .request(app)
                .get('/api/v1/rides/1')
                .end((req, res) => {
                    res.should.have.status(200);
                    assert.equal(res.body.status, 'success');
                    assert.isObject(res.body.data);
                    done();
                });
        });
        it('On error:: incorrect id', (done) => {
            chai
                .request(app)
                .get('/api/v1/rides/705')
                .end((req, res) => {
                    res.should.have.status(404);
                    assert.equal(res.body.status, 'fail');
                    assert.equal(res.body.message, 'Ride does not exist');
                    done();
                });
        });
        it('On error:: incorrect id', (done) => {
            chai
                .request(app)
                .get('/api/v1/rides/hey')
                .end((req, res) => {
                    res.should.have.status(400);
                    assert.exists(res.body.status);
                    assert.exists(res.body.message);
                    done();
                });
        });
    });
});
