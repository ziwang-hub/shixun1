const dbPool = require("../config/poolConfig");

module.exports = {
    addProductDB(arr, cb) {
        dbPool.connect('SELECT max(id) + 1 AS id FROM aliproduct', [], function (err, data) {
            if (err) {
                cb(err, data);
            }
            else {
                arr[0] = data[0].id;
                const sql = "INSERT INTO aliproduct(id,ProductName,ProductKey,Description) VALUES (?,?,?,?)";
                console.log(arr);
                dbPool.connect(sql, arr, function (err, data) {
                    cb(err, data);
                });
            }
        });
    },
    searchAllProductDB(arr, cb) {
        const sql = "SELECT * FROM aliproduct";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    deleteProductDB(arr, cb) {
        const sql = "DELETE FROM aliproduct WHERE id = ?";
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    updateProductDB(arr, cb) {
        const sql = "UPDATE aliproduct SET id = ?, ProductName = ?, Description = ? WHERE ProductKey = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    searchProductDB(arr, cb) {
        const sql = "SELECT * FROM aliproduct WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    }
}