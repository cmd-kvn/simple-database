const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const database = require('../lib/database');
const testDir = './test/db-test-dir';

// describe('dbCreate.getAll', function(){
//     it('returns an array of all objects', done => {
//         dbCreate.getAll('./test/test-dir', (err, contents) => {
//             if (err) return done(err);
            
//             assert.deepEqual(
//                 contents, 
//                 ['BAR', 'FOO', 'QUX']
//             );

//             done();
//         });
//     });
// });
before(done => {
    database.create(testDir);
    fs.stat(testDir, (err, stats) => {
        assert.equal(null, err);
        done();
    });
});

after(done => {
    rimraf(testDir, [], (err) => {
        console.log(err);
        done();
    });
});

describe('database.get', () => {
    it('returns null when the _id can not be found', () => {
    });
});