"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var orders_1 = require("../models/orders");
var Authorization_1 = require("../middleware/Authorization");
var store = new orders_1.OrderStore();
//get all orders for a user, takes user id as params and status of orders to show in the body
var getOrders = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, status, orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.params.id;
                status = req.body.status;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getOrders(user_id, status)];
            case 2:
                orders = _a.sent();
                res.status(302);
                res.json(orders);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                res.status(400);
                res.json(error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//create a new order, takes only user id from params and sets that status to active because it is a new order
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    user_id: req.params.id,
                    status: 'active'
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.create(order)];
            case 2:
                newOrder = _a.sent();
                res.status(201);
                res.json(newOrder);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(400);
                res.json(error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//delete an order by order_id
var destroy = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, user_id, deletedOrder, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = req.body.order_id;
                user_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.delete(order_id, user_id)];
            case 2:
                deletedOrder = _a.sent();
                res.status(200);
                res.json(deletedOrder);
                return [3 /*break*/, 4];
            case 3:
                error_3 = _a.sent();
                res.status(400);
                res.json(error_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//set status of an order by order_id
var setStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, status, user_id, updatedOrder, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = req.body.order_id;
                status = req.body.status;
                user_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.setStatus(order_id, user_id, status)];
            case 2:
                updatedOrder = _a.sent();
                res.status(200);
                res.json(updatedOrder);
                return [3 /*break*/, 4];
            case 3:
                error_4 = _a.sent();
                res.status(400);
                res.json(error_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
// add product to an order, takes order_id, product_id, and quantity from the body (orderProduct)
var addProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderProduct, user_id, addedProduct, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                orderProduct = {
                    order_id: req.body.order_id,
                    product_id: req.body.product_id,
                    quantity: req.body.quantity
                };
                user_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.addProduct(user_id, orderProduct)];
            case 2:
                addedProduct = _a.sent();
                res.status(201);
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                error_5 = _a.sent();
                res.status(400);
                res.json(error_5);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//get total price for an order, takes order_id from the body
var getOrderTotalPrice = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, user_id, orderPrice, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = req.body.order_id;
                user_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getOrderTotalPrice(order_id, user_id)];
            case 2:
                orderPrice = _a.sent();
                res.status(302);
                res.json(orderPrice);
                return [3 /*break*/, 4];
            case 3:
                error_6 = _a.sent();
                res.status(400);
                res.json(error_6);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//get a list of products that are in an order
var getOrderProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order_id, user_id, orderProducts, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order_id = req.body.order_id;
                user_id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, store.getOrderProducts(order_id, user_id)];
            case 2:
                orderProducts = _a.sent();
                res.status(302);
                res.json(orderProducts);
                return [3 /*break*/, 4];
            case 3:
                error_7 = _a.sent();
                res.status(400);
                res.json(error_7);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
//RESTful API routes for orders management
var orders_routes = function (app) {
    //the id passed through params is user_id not order_id, order_is passed in the body.
    //the user_id is used in the middleware (verifyOwnIDToken) to authorize users to manage their own data only, 
    //user_id is also used in the model queries, so data integrity is maintained.
    app.get("/orders/:id", Authorization_1.verifyOwnIDToken, getOrders); //get all orders for a user
    app.get("/orders/:id/totalPrice", Authorization_1.verifyOwnIDToken, getOrderTotalPrice); //get total price of specific order for a user
    app.get("/orders/:id/products", Authorization_1.verifyOwnIDToken, getOrderProducts); //get list of products in a specific order for a user
    app.post("/orders/:id/addProduct", Authorization_1.verifyOwnIDToken, addProduct); //add a new product in a specific order for a user
    app.post("/orders/:id", Authorization_1.verifyOwnIDToken, create); //create a new order for a user
    app.patch("/orders/:id/setStatus", Authorization_1.verifyOwnIDToken, setStatus); //update order status for a user
    app.delete("/orders/:id", Authorization_1.verifyOwnIDToken, destroy); //delete an order for a user
};
exports.default = orders_routes;
