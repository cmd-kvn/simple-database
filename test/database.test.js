const database = require('../lib/database');
const assert = require('assert');
const fs = require('fs');
const dbCreate = database.create('./test-dir');

describe('database.getAll', function(){
    it('returns an array of all objects', done => {
        dbCreate.getAll('./test/test-dir', (err, contents) => {
            if (err) return done(err);
            
            assert.deepEqual(
                contents, 
                ['BAR', 'FOO', 'QUX']
            );

            done();
        });
    });
});
