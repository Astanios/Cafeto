exports.create = function (req, res) {
    connection.query(
        'INSERT INTO users (username) VALUES (?,?,?,?,?)',
        [req.body.name, req.body.description, req.body.picture, req.body.position, req.body.userId],
        function (error, results, fields) {
            if (error) throw error;
            res.end(JSON.stringify(results));
        }
    );
};