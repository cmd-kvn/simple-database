const assert = require('assert');
const net = require('net');
const rimraf = require('rimraf');

const server = require('../lib/db-server');

const PORT = 65000;
const TCP_TEST_DIR = './test/tcp-test-dir';

describe.only('db server', () => {

    // start with a clean directory    
    before(done => {
        rimraf(TCP_TEST_DIR, () => done());
    });

    before(done => {
        // start the server
        server.start({
            baseDir: TCP_TEST_DIR,
            port: PORT },
            () => {done();}
        );
    });

    // destroy the client, stop the server
    after (done => {
        client.end(done);
        server.stop();
    });

    // create tcp client and store it in a variable
    let client;
    before(done => {
        client = net.connect({port: PORT}, () => {
            client.setEncoding('utf8'); // deal only with strings
            done();
        });
    });

    let saved;

    it('lets client save an object', done => {
        const message = {
            method: 'save',
            table: 'shoes',
            data: {
                name: 'Space Jams',
                model: 'AJXI'
            }
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            saved = response.data;
            assert.ok(saved._id);
            done();
        });

        client.write(JSON.stringify(message))
    });

    it('lets the client get the saved object', done => {
        const message = {
            method: 'get',
            table: 'shoes',
            data: saved._id
        };

        client.once('data', data => {
            const response = JSON.parse(data);
            const got = response.data;
            assert.deepEqual(got, saved._id);
            done();
        });

        client.write(JSON.stringify(message));
    });
});
