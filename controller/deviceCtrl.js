const deviceDao = require("../dao/deviceDao");
const openapi = require("../openapi");

var method = '';

module.exports = {
    addDevice: async function (req, resp) {
        let id = req.body.id;
        var ProductKey = req.body.ProductKey;
        var DeviceName = req.body.DeviceName;

        method = 'RegisterDevice';
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": ProductKey,
            "DeviceName": DeviceName
        }
        await callOpenAPI(method, params);

        let DeviceArr = [id, ProductKey, DeviceName];
        deviceDao.addDeviceDB(DeviceArr, function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.send({ succ: true });
                }
                else {
                    resp.send({ succ: false });
                }
            }
        });
    },
    deleteDevice: async (req, resp) => {
        let id = req.body.id;
        var ProductKey = req.body.ProductKey;
        var DeviceName = req.body.DeviceName;

        method = 'DeleteDevice';
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": ProductKey,
            "DeviceName": DeviceName
          }
        await callOpenAPI(method, params);

        deviceDao.deleteDeviceDB(id, function (err, data) {
            if (data) {
                resp.send({ succ: true });
            }
        });
    },
    searchDevice: (req, resp) => {
        let id = req.params.id;
        let DeviceArr = [id];
        deviceDao.searchDeviceDB(DeviceArr, function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                if (data) {
                    let queryData = JSON.stringify(data);
                    resp.send(queryData);
                }
            }
        });
    },
    searchAllDevice: (req, resp) => {
        deviceDao.searchAllDeviceDB(function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                if (data) {
                    resp.send(data);
                    // console.log(data);
                } else {
                }
            }
        });
    }
}

function callOpenAPI(method, params) {
    return new Promise(resolve => {
        //console.log('method ' + method);
        var requestOption = {
            method: 'POST'
        };

        openapi.client.request(method, params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            resolve('success');
        }, (ex) => {
            console.log(ex);
        })

    })
}