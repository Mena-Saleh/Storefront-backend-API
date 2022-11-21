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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var orders_1 = require("../models/orders"); //import the model
var orders = new orders_1.OrderStore(); //Create an object of my model
var req = (0, supertest_1.default)(server_1.default);
describe('orders model testing', function () {
    it('should have a create method', function () {
        expect(orders.create).toBeDefined();
    });
    it('create should make new order and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createTestOrder, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createTestOrder = {
                        user_id: '1',
                        status: 'active'
                    };
                    return [4 /*yield*/, orders.create(createTestOrder)];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have delete method', function () {
        expect(orders.delete).toBeDefined();
    });
    it('delete deletes an order and returns it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orders.delete('3', '2')];
                case 1:
                    result = _a.sent();
                    expect(result).toBeTruthy;
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have setStatus method', function () {
        expect(orders.setStatus).toBeDefined();
    });
    it('setStatus should change order status and return new order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orders.setStatus('3', '2', 'complete')];
                case 1:
                    result = _a.sent();
                    expect(result.status).toEqual('complete');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have addProduct method', function () {
        expect(orders.addProduct).toBeDefined();
    });
    it('addProduct should add product returning orderProduct', function () { return __awaiter(void 0, void 0, void 0, function () {
        var testAddOrderProduct, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    testAddOrderProduct = {
                        order_id: '1',
                        product_id: '2',
                        quantity: 3
                    };
                    return [4 /*yield*/, orders.addProduct('1', testAddOrderProduct)];
                case 1:
                    result = _a.sent();
                    expect(result.quantity).toEqual(3);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have getOrders method', function () {
        expect(orders.getOrders).toBeDefined();
    });
    it('getOrders gets orders of a user of a specific status', function () { return __awaiter(void 0, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orders.getOrders('1', 'active')];
                case 1:
                    results = _a.sent();
                    expect(results[0].status).toEqual('active');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have getOrderProducts method', function () {
        expect(orders.getOrderProducts).toBeDefined();
    });
    it('getOrderProducts gets list of items in an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orders.getOrderProducts('1', '1')];
                case 1:
                    results = _a.sent();
                    expect(results.length).toEqual(4);
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have getOrderTotalPrice method', function () {
        expect(orders.getOrderTotalPrice).toBeDefined();
    });
    it('getOrderTotalPrice gets total price of an order', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, orders.getOrderTotalPrice('1', '1')];
                case 1:
                    result = _a.sent();
                    expect(result.total_price).toEqual('550');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('endpoints testing for orders handlers', function () {
    it('get orders shows all user orders (active or complete can be specified)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1').send({ status: 'active' }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get orders requires own user authorization)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1').send({ status: 'active' }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create creates a new order for the authorized user)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/orders/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create requires own user authorization)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/orders/1').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete deletes order by id)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.delete('/orders/1').send({ order_id: '5' }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('set status changes status of order by order id for the authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.patch('/orders/1/setStatus').send({ order_id: 1, status: 'active' }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('set status requires id and token of order owner', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.patch('/orders/1/setStatus').send({ order_id: 1, status: 'active' }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add product adds product to order by order id for the authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/orders/1/addProduct').send({ order_id: 1, product_id: 3, quantity: 4 }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('add product requires id and token of order owner', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/orders/1/addProduct').send({ order_id: 1, product_id: 3, quantity: 4 }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get total prices gets the order total price by order id for the authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1/totalPrice').send({ order_id: 1 }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get total prices requires authorization of order owner', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1/totalPrice').send({ order_id: 1 })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get order products gets a list of products in an order by order id for the authorized user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1/products').send({ order_id: 1 }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('get order products requires authorization of order owner', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/orders/1/products').send({ order_id: 1 })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
