const productDao = require("../dao/productDao");
const openapi = require("../openapi");

var method = '';
var cbKey = '';

module.exports = {
    addProduct: async function (req, resp) {
        // console.log(req.body);
        let id = req.body.id;
        var ProductName = req.body.ProductName;
        var Description = req.body.Description;

        method = 'CreateProduct';
        var params = {
            "RegionId": "cn-shanghai",
            "NodeType": "0",
            "ProductName": ProductName,
            "Description": Description
        }
        await callOpenAPI(method, params);

        let ProductArr = [id, ProductName, cbKey, Description];
        productDao.addProductDB(ProductArr, function (err, data) {
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
    deleteProduct: async (req, resp) => {
        let id = req.body.id;
        var ProductKey = req.body.ProductKey;

        method = 'DeleteProduct';
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": ProductKey
        }
        await callOpenAPI(method, params);

        productDao.deleteProductDB(id, function (err, data) {
            if (data) {
                resp.send({ succ: true });
            }
        });
    },
    updateProduct: async (req, resp) => {
        let id = req.body.id;
        let ProductKey = req.body.ProductKey;
        let ProductName = req.body.ProductName;
        let Description = req.body.Description;

        method = 'UpdateProduct';
        var params = {
            "RegionId": "cn-shanghai",
            "ProductName": ProductName,
            "ProductKey": ProductKey
        }
        await callOpenAPI(method, params);

        let ProductArr = [id, ProductName, Description, ProductKey];
        productDao.updateProductDB(ProductArr, function (err, data) {
            if (err) {
                console.log(err);
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
    searchProduct: (req, resp) => {
        let id = req.params.id;
        let ProductArr = [id];
        productDao.searchProductDB(ProductArr, function (err, data) {
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
    searchAllProduct: (req, resp) => {
        productDao.searchAllProductDB(function (err, data) {
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
        console.log('method ' + method);
        var requestOption = {
            method: 'POST'
        };

        openapi.client.request(method, params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            if (method == 'CreateProduct') {
                cbKey = JSON.stringify(result);
                cbKey = JSON.parse(cbKey).Data.ProductKey;
                console.log(cbKey);
            }
            resolve('success');
        }, (ex) => {
            console.log(ex);
        })

    })
}