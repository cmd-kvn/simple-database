const fs = require('fs');
const path = require('path');

module.exports = {
    create: function(directory) {
        return {
            save: function(){

            },
            update: function(){

            },
            remove: function(){

            },
            get: function(){

            },
            getAll: function(directory, cb){
                fs.readdir(directory, (err, files) => {
                    if(err) return cb(err);

                    const results = [];
                    let count = files.length;
                    files.forEach((file, i) => {
                        const fileName = path.join(directory, file);
                        fs.readFile(fileName, {encoding: 'utf8'}, (err, content) => {
                            if(err) return cb(err);

                            results[i] = content;
                            count--;
                            if(!count) {
                                cb(null, results);
                            }
                        });
                    })
                });
            }
        }
    }
}