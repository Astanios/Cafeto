// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD
});

//READ methods
exports.getAll = function (req, res) {
    connection.query('SELECT events.id, events.name, events.description, events.position, events.picture, events.userId, users.username FROM events INNER JOIN users ON events.userId=users.id', function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
};

exports.get = function (req, res) {
    connection.query('select * from events where id=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
};

//UPDATE methods
exports.update = function (req, res) {
    connection.query(
        'UPDATE `events` SET `name`=?,`description`=?,`picture`=?,`position`=?, `updated_at`=? where `id`=?',
        [req.body.name, req.body.description, req.body.picture, req.body.position, req.body.updated_at, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
};

exports.readCreate = function (req, res) {
    console.log('readCreate', req.body);
    connection.query(
        'INSERT IGNORE users (username, id) VALUES (?,?)',
        [req.body.name, req.body.id],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
};

//CREATE method
exports.create = function (req, res) {
    connection.query(
        'INSERT INTO events (name, description, picture, position, userId) VALUES (?,?,?,?,?)',
        [req.body.name, req.body.description, req.body.picture, req.body.location, req.body.userId],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
};

//DELETE method
exports.delete = function (req, res) {
    connection.query('DELETE FROM events WHERE `id`=?', [req.params.id], function (error, results, fields) {
        if (error) throw error;
        res.end('Record has been deleted!');
    });
};
