const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const app = require('../app');

const apiAddress = "http://localhost:3000/";

describe('Demonstration of tests', function () {
    before(function () {
        // start the server
        app.start();
    });

    after(function () {
        // close the server
        app.close();
    })

    describe('Testing route /', function () {

        it('Should return successfully response', function () {

            // prepare http request
            // send the request to our server
            chai.request(apiAddress).get('/')
                .then(res => {
                    expect(res).to.have.status(200);
                })
                .catch(error => {
                    throw error;
                })
        })
    })
})

describe('Testing users ', () => {
    it('Should return successfully when a user log in ',async function() {
        chai.request(apiAddress)
        .post('/login')
        .send({
            username: "test123@test.com",
            password: "test123"
        })
        .then(res => {
            expect(res).to.have.status(200)
        })
    }),
        it('Should check if the password is not match ', async function () {
            chai.request(apiAddress)
                .post('/login')
                .send({
                    username: "test123@test.com",
                    password: "test12"
                })
                .then(res => {
                    expect(res).to.have.include('Password does not match')
                })
        }),
        it('Should check when the username is wrong', async function () {
            chai.request(apiAddress)
                .post('/login')
                .send({
                    username: "test3@test.com",
                    password: "test123"
                })
                .then(res => {
                    expect(res).to.have.include('No user exist')
                })
        }),

    it('Should check an existed user when register' , async function(){
        chai.request(apiAddress)
        .post('/register')
        .send({
            username: "test123@test.com",
            password: "test123"
        })
        .then(res => {
            expect(res).to.have.include('Email existed')
        })
    }) 
})
