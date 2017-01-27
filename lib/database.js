const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');

module.exports = {
    destroy: function(directory){
        //?/rimraf
    },
    create: function(directory) {
        //?/if(!directory)
        //?/mkdirp
        mkdirp(directory, err => {
            if(err) console.log(err)
            else console.log('new database created')
        });

        return {
            // save: function(){

            // },
            // update: function(){

            // },
            // remove: function(){

            // },
            // get: function(){

            // },
            // getAll: function(directory, cb){
            //     fs.readdir(directory, (err, files) => {
            //         if(err) return cb(err);

            //         const results = [];
            //         let count = files.length;
            //         files.forEach((file, i) => {
            //             const fileName = path.join(directory, file);
            //             fs.readFile(fileName, {encoding: 'utf8'}, (err, content) => {
            //                 if(err) return cb(err);

            //                 results[i] = content;
            //                 count--;
            //                 if(!count) {
            //                     cb(null, results);
            //                 }
            //             });
            //         })
            //     });
            // }
        }
    }
}