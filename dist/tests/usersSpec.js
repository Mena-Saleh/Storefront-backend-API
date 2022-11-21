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
var users_1 = require("../models/users");
var users = new users_1.UserStore();
var req = (0, supertest_1.default)(server_1.default);
describe('users model testing', function () {
    it('should have an index method', function () {
        expect(users.index).toBeDefined();
    });
    it('index should return a list of users', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.index()];
                case 1:
                    result = _a.sent();
                    expect(result.length).toBe(3);
                    expect(result[0].email).toEqual('mena@gmail.com');
                    expect(result[0].lastname).toEqual('saleh');
                    expect(result[2].email).toEqual('maria@gmail.com');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have a show method', function () {
        expect(users.show).toBeDefined();
    });
    it('show should return a user', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.show('1')];
                case 1:
                    result = _a.sent();
                    expect(result.email).toEqual('mena@gmail.com');
                    expect(result.firstname).toEqual('mena');
                    expect(result.role).toEqual('admin');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have a create method', function () {
        expect(users.create).toBeDefined();
    });
    it('create should create new user and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createTestUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createTestUser = {
                        firstname: 'mo',
                        lastname: 'salah',
                        email: 'mo@gmail.com',
                        password: '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a',
                        role: 'user'
                    };
                    return [4 /*yield*/, users.create(createTestUser)];
                case 1:
                    result = _a.sent();
                    expect(result.email).toEqual('mo@gmail.com');
                    expect(result.firstname).toEqual('mo');
                    expect(result.role).toEqual('user');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have a delete method', function () {
        expect(users.delete).toBeDefined();
    });
    it('delete should delete existing user and return it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.delete('4')];
                case 1:
                    result = _a.sent();
                    expect(result.email).toEqual('mo@gmail.com');
                    expect(result.firstname).toEqual('mo');
                    expect(result.role).toEqual('user');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an update method', function () {
        expect(users.update).toBeDefined();
    });
    it('update should update user and return new user info', function () { return __awaiter(void 0, void 0, void 0, function () {
        var updateTestUser, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    updateTestUser = {
                        firstname: 'mena',
                        lastname: 'ashraf',
                        email: 'mena@gmail.com',
                        password: '$2b$10$nEfMiGToRkN9coB5lPs4.uldf.5HMS64MEvc9lZbGflwYgJ9ynl0a',
                        role: 'admin'
                    };
                    return [4 /*yield*/, users.update('1', updateTestUser)];
                case 1:
                    result = _a.sent();
                    expect(result.email).toEqual('mena@gmail.com');
                    expect(result.lastname).toEqual('ashraf');
                    return [2 /*return*/];
            }
        });
    }); });
    it('should have an authenticate method', function () {
        expect(users.update).toBeDefined();
    });
    it('authenticate returns null if authentication fails', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.authenticate('mene@gmail.com', 'notTheRightPassword')];
                case 1:
                    result = _a.sent();
                    expect(result).toEqual(null);
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticate returns user on success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, users.authenticate('mene@gmail.com', '123')];
                case 1:
                    result = _a.sent();
                    expect(result).toBeTruthy;
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('endpoints testing for Users handlers', function () {
    it('index shows all users if admin requested', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('index is unauthorized if a normal user uses it', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('show returns a user that the admin requests', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.get('/users').set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('create creates a user and returns a token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/users').send({
                        firstname: 'joe',
                        lastname: 'doe',
                        email: 'joe@gmail.com',
                        password: '789'
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update updates authorized user and returns new user in JSON', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.patch('/users/1').send({
                        firstname: 'mena',
                        lastname: 'saleh',
                        email: 'mena@gmail.com',
                        password: '123'
                    })
                        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJtZW5hIHNhbGVoIiwiZW1haWwiOiJtZW5hQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2ODk4NTEyNH0.PkaWPn983Fe11xSt0XItQC2Qy0MIaZXR76oeo8yxDrE')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('update requires own user authorization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.patch('/users/1').send({
                        firstname: 'mena',
                        lastname: 'saleh',
                        email: 'mena@gmail.com',
                        password: '123'
                    })
                        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete requires own user authorization', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.delete('/users/2')
                        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJtYXJpYSBhbGxlbiIsImVtYWlsIjoibWFyaWFAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODU0OTB9.W-JFX9ydP4MadvAwSLZYmBT1sXAMpdj734XfmaY_mbo')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it('delete deletes own user account', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.delete('/users/4')
                        .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJqb2UgZG9lIiwiZW1haWwiOiJqb2VAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE2Njg5ODg3MDN9.NzJ3aepigFvOdNEGuF0kT5qnDgZp13_lEAesNFbkprw')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticate logs user in and returns token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/users/authenticate').send({ email: 'mena@gmail.com', password: '123' })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(302);
                    return [2 /*return*/];
            }
        });
    }); });
    it('authenticate returns not found when user enters wrong email or password', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, req.post('/users/authenticate').send({ email: 'mena@gmail.com', password: 'IAmAWrongPassword:D' })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
