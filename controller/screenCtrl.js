const mysql = require("mysql");
const client = require("../openapi");

module.exports = {
    selled(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from led order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    selac(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from ac order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    selfan(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from fan order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    selfurnace(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from furnace order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    selHumdplus(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from Humdplus order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    seldiox(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from diox order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    sellight(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from light order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    seltemp(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from temp order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    selhumd(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from humd order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },

    seljiujing(req, res) {
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        connection.query('select * from jiujing order by time desc limit 1', function (err, result) {
            if (err) {
                console.log(err)
            } else {
                console.log("查询成功");
            }
            res.send(JSON.stringify(result));
        });
        connection.end();
    },


    alisetLED(req, res) {
        // console.log("err");
        // console.log(req.body.status);
        // console.log("err");
        var status = req.body.status
        var params = {
            "RegionId": "cn-shanghai",
            "Items": "{\"LightStatus\":" + status + "}",
            "ProductKey": "a1CEtPkcVru",
            "DeviceName": "LedC"
        }
        var requestOption = {
            method: 'POST'
        };

        client.client.request('SetDeviceProperty', params, requestOption).then((result) => {

            console.log("运行");
            console.log(JSON.stringify(result));
            res.send({ succ: true })
        }, (ex) => {
            console.log(ex);
        })
    },

    // echarts1(req, resp) {
    //     const id = req.params["id"];
    //     const count = req.params["count"];
    //     var sql = "SELECT * from Temp WHERE id='" + id + "' order by time desc limit " + count;
    //     console.log(sql);
    //     stuDao.getStuDao(sql, [], function (err, result) {
    //         if (err) {
    //             console.log('[SELECT ERROR] - ', err.message);
    //             resp.send(JSON.stringify({
    //                 succ: false,
    //                 msg: '查询失败！',
    //             }));
    //             return;
    //         }
    //         const resp1 = {
    //             id: id,
    //             data: result
    //         };


    //         console.log(JSON.stringify(resp1));
    //         resp.send(JSON.stringify(resp1));
    //         resp.end();
    //     })
    // }




}