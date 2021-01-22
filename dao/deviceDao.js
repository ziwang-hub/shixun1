const dbPool = require("../config/poolConfig");

module.exports = {
    addDeviceDB(arr, cb) {
        dbPool.connect('SELECT max(id) + 1 AS id FROM alidevice', [], function (err, data) {
            if (err) {
                cb(err, data);
            }
            else {
                arr[0] = data[0].id;
                const sql = "INSERT INTO alidevice(id,ProductKey,DeviceName) VALUES (?,?,?)";
                console.log(arr);
                dbPool.connect(sql, arr, function (err, data) {
                    cb(err, data);
                });
            }
        });
    },
    searchAllDeviceDB(arr, cb) {
        const sql = "SELECT * FROM alidevice";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    deleteDeviceDB(arr, cb) {
        const sql = "DELETE FROM alidevice WHERE id = ?";
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    searchDeviceDB(arr, cb) {
        const sql = "SELECT * FROM alidevice WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    }
}