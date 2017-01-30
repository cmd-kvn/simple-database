const fs = require('fs');
const mkdirp = require('mkdirp');
const path = require('path');
const rimraf = require('rimraf');
const simpleid = require('simpleid');

const stdout = process.stdout;

module.exports = {
    create: function(directory) {
        // create a new database
        mkdirp(directory, err => {
            if(err) console.log(err);
            else stdout.write('new database created\n');
        });

        return {
            save: function(table, objectToSave, cb){
                var enterPath = path.join(directory, table + '.json'); //directory/table.json
                // read the table (file) for its data (contents (the array of objects))
                fs.readFile(enterPath, (err, data) => {
                    // if (err) throw (err); // if used, the error will always be shown because the !file
                    if (!data){ // there is no data in the table   
                        // make an empty array in the data then put then put the object in
                        // determine if the objectToSave has an _id
                        if (objectToSave.hasOwnProperty('_id')) return cb(err); // if yes, return error
                        else { // give the objectToSave an _id
                            objectToSave._id = simpleid();
                            const jsondObject = JSON.stringify([objectToSave]); // stringify to prepare it for the writeFile
                            const filePath = path.join(directory, table + '.json') // detail where the objectToSave is going
                            // put the objectToSave in an array (to being with) and write it to the filePath
                            fs.writeFile(filePath, jsondObject, (err) => {
                                if (err) cb(err);
                                else cb(null, objectToSave) // returns the object with the id
                            })
                        }                                
                    } else { // there is data in the table
                        // if the objectToSave has an id, return error
                        if (objectToSave.hasOwnProperty('_id')) return cb(err);
                        else { // give the objectToSave an _id
                            objectToSave._id = simpleid();
                            const filePath = path.join(directory, table + '.json');
                            var newData = JSON.parse(data); // the array of objects inside the file
                            newData.push(objectToSave); // add the new objectToSave to the array of objects

                            fs.writeFile(filePath, JSON.stringify(newData), (err) => {
                                if (err) cb(err);
                                else cb(null, objectToSave) // return the object with the id
                            })
                        }     
                    }
                })
            },
            // update: function(){

            // },
            // remove: function(id, cb){
                // returns number of files removed
            // },
            get: function(table, id, cb){
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        
                        var parsedDataArr = JSON.parse(data);
                        
                        var passThis = parsedDataArr.filter(matchID)[0];

                        function matchID(val){
                            if (val._id === id) return val; //returns [val]
                        } 
                        cb(null, passThis);
                    };
                });
            },
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