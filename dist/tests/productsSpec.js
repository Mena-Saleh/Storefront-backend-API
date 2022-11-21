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
var products_1 = require("../models/products");
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../server"));
var products = new products_1.ProductStore();
var req = (0, supertest_1.default)(server_1.default);
describe('products model testing', function () {
    it('should have index method', function () {
        expect(products.index).toBeDefined();
    });
    it('index should return a list of products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var results;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, products.index()];
                case 1:
                    results = _a.sent();
                    expect(results.length).toEqual(5);
                    expect(results[0].price).toEqual(5);
                    expect(results[4].name).toEqual('steak');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have show method', function () {
        expect(products.show).toBeDefined();
    });
    it('show should return a product by id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, products.show('3')];
                case 1:
                    result = _a.sent();
                    expect(result.name).toEqual('chocolate');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have create method', function () {
        expect(products.create).toBeDefined();
    });
    it('create should create new product and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createTestProduct, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createTestProduct = {
                        name: "mango",
                        price: 12
                    };
                    return [4 /*yield*/, products.create(createTestProduct)];
                case 1:
                    result = _a.sent();
                    expect(result.name).toEqual('mango');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have delete method', function () {
        expect(products.delete).toBeDefined();
    });
    it('delete should delete product and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, products.delete('6')];
                case 1:
                    result = _a.sent();
                    expect(result.name).toEqual('mango');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have update method', function () {
        expect(products.update).toBeDefined();
    });
    it('update should update product and return new information', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateTestProduct, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateTestProduct = {
                        name: "steak",
                        price: 300
                    };
                    return [4 /*yield*/, products.update('5', updateTestProduct)];
                case 1:
                    result = _a.sent();
                    expect(result.price).toEqual(300);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('endpoints testing for products handlers', function () {
    it('index shows all products', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/products')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index shows a specific product', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/products/2')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create creates a new product by admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/products').send({
                        name: "lasagna",
                        price: 55
                    }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create requires admin token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/products').send({
                        name: "lasagna",
                        price: 55
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update updates an existing product by admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.patch('/products/6').send({
                        name: "lasagna",
                        price: 88
                    }).set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update requires admin token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/products').send({
                        name: "lasagna",
                        price: 90
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete deletes specific product by admin', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.delete('/products/6').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete requires admin token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.delete('/products/6')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
});
