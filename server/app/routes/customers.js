module.exports.all = (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM customers', (err, rows) => {
            if (err) throw new Error;
            res.send(rows);
        });
    });
};

module.exports.add = (req, res) => {
    let input = req.body;
    req.getConnection((err, connection) => {
        let data = {
            name: input.name,
            surname: input.surname,
            age: input.age
        };
        connection.query('INSERT INTO customers SET ?', [data],(err, rows) => {
            if (err) throw new Error;
            res.send({
                id: rows.insertId,
                name: data.name,
                surname: data.surname,
                age: data.age
            });
        });
    });
};

module.exports.edit = (req, res) => {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query('SELECT * FROM customers WHERE id = ?', [id], (err, rows) => {
            if (err) throw new Error;
            res.send(rows[0]);
        });
    });
};

module.exports.edit_save = (req, res) => {
    let id = req.params.id;
    let input = req.body;
    req.getConnection((err, connection) => {
        let data = {
            name: input.name,
            surname: input.surname,
            age: input.age
        };
        connection.query('UPDATE customers SET ? WHERE id = ?', [data, id], (err, rows) => {
            if (err) throw new Error;
            res.send({
                id: id,
                name: data.name,
                surname: data.surname,
                age: data.age
            });
        });
    });
};

module.exports.delete = (req, res) => {
    let id = req.params.id;
    req.getConnection((err, connection) => {
        connection.query('DELETE FROM customers WHERE id = ?', [id], (err, rows) => {
            if (err) throw new Error;
            res.send(id);
        });
    });
};