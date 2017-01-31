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
var testObject2 = {
    message: 'I am inside the test object2'
}
var testObject3 = {
    message: 'I am inside the test object3'
}
var testObject4 = {
    message: 'I am inside the test object4'
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

describe('database.update', () => {
    it('starts with a saved object', (done) => {
        db.save('updateTest', testObject4, (err, result) => {
            assert.ok(result.hasOwnProperty('_id'));
            done();
        })
    })
    
    it('returns the object to save with updates', (done) => {
        stdout.write('changes are made to the object\n');
        testObject4.newAddition = 'this is a modification';
        db.update('updateTest', testObject4, (err, result) => {
            assert.ok(result.hasOwnProperty('newAddition'));
            done();
        })
    });
});

describe('database.remove', () => {
    it('starts with a saved object', (done) => {
        db.save('removeTest', testObject3, (err, result) => {
            assert.ok(result.hasOwnProperty('_id'));
            done();
        })
    });

    it('returns the number of files removed', (done) => {
        db.remove('removeTest', testObject3._id, (err, result) => {
            assert.equal(1, result);
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

describe('dbCreate.getAll', function(){
    it('starts by saving testObject2 to findMe which already has testObject', done => {
        db.save('findMe', testObject2, (err, result) => {
            assert.ok(result.hasOwnProperty('_id'));
            done();
        })
    });

    it('returns an array of all objects from findMe', done => {
        db.getAll('findMe', (err, contents) => {
            assert.deepEqual(contents, [testObject, testObject2]);
            done();
        });
    });
});