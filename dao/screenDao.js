const dbPool = require("../config/poolConfig");

module.exports = {
    searchTopicDB(arr, cb) {
        const sql = "SELECT ProductKey,DeviceName FROM screen";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    updateValueDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getAllValueDB(arr, cb) {
        const sql = "SELECT * FROM screen";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getValueDB(arr, cb) {
        const sql = "SELECT value,DeviceName FROM screen;";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
}


