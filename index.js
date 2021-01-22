// 1、导入项目依赖
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const screen = require("./router/screenRouter");
const product = require("./router/productRouter");
const device = require("./router/deviceRouter");

// const aliyun = require("./service/aliyun");

// aliyun.getAliptConection();

const app = express();

// 打印日志
app.use(logger("dev"));
// 解析post方法
app.use(bodyParser.urlencoded({ extended: false })); // 配置post的body模块
app.use(bodyParser.json()); // 将数据转换为json

//设置跨域访问
app.all("*", function (req, res, next) {
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin", "*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers", "content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})

// 根据不同功能划分模块使用路由
app.use(screen);
app.use(product);
app.use(device);

// 配置静态资源
app.use(express.static(__dirname + "/static"));
// 配置网页小icon
/*app.use(favicon(__dirname + "/static/img/1206767.png"));

// 当发生404页面错误的时候返回一个404.html文件
app.use(function (req, resp) {
    resp.status(404);
    // 重定向
    resp.redirect("/page/404.html");
});*/

app.listen(4000, () => {
    console.log("服务器在4000端口启动中……");
});


//const ws = require('./ws');
const container = require('rhea');
const crypto = require('crypto');
const mysql = require("mysql");
//建立连接。
var dt = new Date();
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。
    'host': '1567268617402143.iot-amqp.cn-shanghai.aliyuncs.com',
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId，购买的实例请填写实例ID，公共实例请填空字符串""。
    'username': '38-00-25-34-C6-14|authMode=aksign,signMethod=hmacsha1,timestamp='
        + dt.getTime() +
        ',authId=LTAI4Fnoycg1JiFJr9kpBEVE,iotInstanceId=,consumerGroupId=DEFAULT_GROUP|',
    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。
    'password': hmacSha1(
        'zDbSAbDak38fAUq5Mh4DtDmTGWJOnj',
        'authId=LTAI4Fnoycg1JiFJr9kpBEVE&timestamp='
        + dt.getTime()),
});
//创建Receiver连接。

var receiver = connection.open_receiver();

//接收云端推送消息的回调函数。
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();


    if (topic === '/a1CEtPkcVru/LedC/thing/event/property/post') {
        const resp = JSON.parse(content);
        // console.log(Number(resp.checkFailedData.LightStatus.value));
        if (resp.checkFailedData.LightStatus != undefined) {
            const status = Number(resp.checkFailedData.LightStatus.value);

            var connection = mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: '',
                port: 3306,
                database: 'www'
            })
            connection.connect();
            console.log("连接成功")
            connection.query('insert into led(value,time) values(?,?)', [status, Date.now()], function (err, result) {
                if (err) {
                    throw err;
                } else {
                    var data = {
                        code: '200',
                        code_decoration: '添加成功'
                    }
                    // res.send({value:data, succ: true });
                    console.log('----------------------');
                    console.log(result);
                    console.log('----------------------');
                    //console.log(data);
                }
            });
            connection.end();
        }
    }

    if (topic === '/a1rBmiRRpKY/airC/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.PowerSwitch.value));
        const status = Number(resp.items.PowerSwitch.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into ac(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1Wl70RV8JO/fanC/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.PowerSwitch.value));
        const status = Number(resp.items.PowerSwitch.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into fan(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1Vu502ix46/Templus/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.PowerSwitch.value));
        const status = Number(resp.items.PowerSwitch.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into furnace(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1CjjJ9T36N/humplus/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.PowerSwitch.value));
        const status = Number(resp.items.PowerSwitch.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into Humdplus(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1VjLq36Xh8/Temp/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.CurrentTemperature.value));
        const status = Number(resp.items.CurrentTemperature.value);
        const id = 001;
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into Temp(value,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }



    if (topic === '/a1gAtpVv8uV/Humd/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.CurrentHumidity.value));
        const status = Number(resp.items.CurrentHumidity.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into humd(value1,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1PIzADcq4C/light/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.MeasuredIlluminance.value));
        const status = Number(resp.items.MeasuredIlluminance.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into light(value4,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1b0PtrhMsI/jiujing/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.HCHO.value));
        const status = Number(resp.items.HCHO.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into jiujing(value3,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    if (topic === '/a1qySHKezKh/diox/thing/event/property/post') {
        const resp = JSON.parse(content);
        console.log(Number(resp.items.CO2.value));
        const status = Number(resp.items.CO2.value);

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            port: 3306,
            database: 'www'
        })
        connection.connect();
        console.log("连接成功")
        connection.query('insert into diox(value2,time) values(?,?)', [status, Date.now()], function (err, result) {
            if (err) {
                throw err;
            } else {
                var data = {
                    code: '200',
                    code_decoration: '添加成功'
                }
                // res.send({value:data, succ: true });
                console.log('----------------------');
                console.log(result);
                console.log('----------------------');
                //console.log(data);
            }
        });
        connection.end();
    }

    //ws.send2All(Number(resp.items.LightStatus.value));
    // devDao.receiveUpdate(Number(resp.items.LightStatus.value));
    // led.status = resp.items.LightStatus.value;
    //发送ACK，注意不要在回调函数有耗时逻辑。
    context.delivery.accept();
});

//计算password签名。
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest())
        .toString('base64');
}

