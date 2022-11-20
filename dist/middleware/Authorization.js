"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOwnIDToken = exports.verifyAdminToken = exports.verifyAuthToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//verify that a token is valid (user is logged in)
var verifyAuthToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.status(401);
        res.send("Invalid Token");
    }
};
exports.verifyAuthToken = verifyAuthToken;
//verify that a token is valid and belongs to an admin.
var verifyAdminToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decoded = (jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
        if (decoded.role !== 'admin') {
            console.log(decoded);
            res.status(401).send("Unauthorized request, must be an admin to use this functionality");
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401);
        res.send("Invalid Token");
    }
};
exports.verifyAdminToken = verifyAdminToken;
//verify that a token is valid, and that the id in request params matches the id in the token (so that users can manage what belongs to them only)
var verifyOwnIDToken = function (req, res, next) {
    try {
        var authorizationHeader = req.headers.authorization;
        var token = authorizationHeader.split(' ')[1];
        var decoded = (jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET));
        if (decoded.id != req.params.id) {
            res.status(401);
            res.send("Unauthorized request, you can only manage your own account");
        }
        else {
            next();
        }
    }
    catch (error) {
        res.status(401);
        res.send("Invalid Token");
    }
};
exports.verifyOwnIDToken = verifyOwnIDToken;
