const net = require('net');
const server = net.createServer();

const database = require('./database');

let db = null;

server.on('connection', client => {
    client.setEncoding('utf8'); // to deal only with strings

    // 'data' will be the string (utf8) the client enters
    // /sends as a request and turns the listener on
    client.on('data', data => {
        const request = JSON.parse(data); // request from the client
        // calls to the library
        if (request.method === 'save') {
            db.save(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({data: data}));
            })
        } 
        else if (request.method === 'get') {
            db.get(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({data: data}));
            })
        }
        else if (request.method === 'getAll') {
            db.getAll(request.table, (err, data) => {
                client.write(JSON.stringify({data: data}));
            })
        }
        else if (request.method === 'update') {
            db.update(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({data: data}));
            })
        }
        else if (request.method === 'remove') {
            db.remove(request.table, request.data, (err, data) => {
                client.write(JSON.stringify({data: data}));
            }) 
        }
    });
});

module.exports = {
    start(options, cb) {
        // ^ options comes from server.start in the test file
        // the server.start has an object with baseDir and port

        // create the db
        db = database.create(options.baseDir);
        // start the server (listen)
        server.listen(options.port, () => {
            cb();
        });
    },
    stop(cb) {
        server.close(cb); // close the server
    }
};