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
            update: function(table, objectToSave, cb){
                const filePath = path.join(directory, table + '.json');
                
                if(!objectToSave._id) return cb(err); // returns error if object has no id 
                else { // returns object to save
                    fs.readFile(filePath, (err, data) => {
                        // parse then map through the data to replace the one object
                        // that will be updated
                        var updatedData = JSON.parse(data).map((x) =>{
                            if (x._id === objectToSave._id) return objectToSave;
                            else return x;
                        });
                        // write and update the file 
                        fs.writeFile(filePath, JSON.stringify(updatedData), (err) => {
                            if (err) cb(err);
                            else cb(null, objectToSave); // return updated saved object
                        })
                    })
                }
            },
            remove: function(table, id, cb){
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        var notRemoved = JSON.parse(data).map((x) => {
                            // keep only the objects without matching ids
                            if(x._id !== id) return x;
                            // when x._id === id, that index becomes 'undefined'
                        })
                        // sort to move index with undefined to the end and pop it off
                        notRemoved.sort().pop(); 
                                                
                        fs.writeFile(filePath, JSON.stringify(notRemoved), (err) => {
                            if(err) cb(err)
                            // return number of files removed
                            else cb(null, JSON.parse(data).length - notRemoved.length);
                        })
                    }
                })

                // // deletes the whole file
                // fs.unlink(filePath, (err) => {
                //     stdout.write(`err inside is ${err}\n`)
                //     if(err) cb(err);
                //     else{
                //         cb(null, 1);
                //     }
                // })
                // returns number of files removed
            },
            get: function(table, id, cb){
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        cb (
                            null, 
                            // the data from the file needs to be parsed
                            // into an array of objects, then filtered
                            // through each object to find the id that 
                            // matches the id in the get arg and returned as
                            // the object ([0]), not [object]
                            JSON.parse(data).filter((val) => {
                            if (val._id === id) return val;
                            })[0]
                        );
                    };
                });
            },
            getAll: function(table, cb) {
                const filePath = path.join(directory, table + '.json');
                fs.readFile(filePath, (err, data) => {
                    if(err) cb(err);
                    else {
                        // returns an array of all objects
                        // 'data' is a stringify'd array of objects
                        cb(null, JSON.parse(data)); 
                    };
                });
            }
        }
    }
}