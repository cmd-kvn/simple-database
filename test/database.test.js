const assert = require('assert');
const fs = require('fs');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const database = require('../lib/database');
const testDir = './test/db-test-dir';
const stdout = process.stdout;

var db;
var testObject = {
    message: 'I am inside the test object'
}
var testObject1 = {
    message: 'I am inside the test object1'
}

before(done => {
    db = database.create(testDir);
    fs.stat(testDir, (err, stats) => {
        assert.equal(null, err);
        done();
    });
});

after(done => {
    rimraf(testDir, [], (err) => {
        done();
    });
});

describe('database.save', () => {
    it('gives the objectToSave an _id property', (done) =>{
        db.save('findMe', testObject, (err, result) => {
            assert.ok(result.hasOwnProperty('_id'));
            done();
        })
    });

});

describe('database.get', () => {
    it('returns null when the _id can not be found', (done) => {
        db.get('findMe', 'noooopppeeee', (err, result) => {
            assert.equal(err, null);
            done();
        })
    });

    it('starts with a saved object', (done) => {
         db.save('getTest', testObject1, (err, result) => {
            assert.ok(result.hasOwnProperty('_id'));
            done();
        })
    });

    it('returns the saved object with that id', (done) => {
            db.get('getTest', testObject1._id, (err, result) => {
            assert.equal(result._id, testObject1._id);
            done();
        });
    });
});

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