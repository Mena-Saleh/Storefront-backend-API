"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var products_1 = __importDefault(require("./handlers/products"));
var users_1 = __importDefault(require("./handlers/users"));
var orders_1 = __importDefault(require("./handlers/orders"));
//server port and instance of express
var port = 3000;
var app = (0, express_1.default)();
var corsOptions = {
    //white listing foreign domains
    origin: 'http://someotherdomain.com',
    optionsSuccessStatus: 200
};
//using cors library with its configuration, and using bodyparser
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
//server initialization
app.listen(port, function () {
    console.log('server is listening on port ' + port);
});
//Home route with cors enabled
app.get('/', (0, cors_1.default)(corsOptions), function (req, res) {
    res.send("This is the home page of the API :) check the README file for info on how to use the API");
});
//Passing RESTful route handlers to the express app instance:
(0, products_1.default)(app);
(0, users_1.default)(app);
(0, orders_1.default)(app);
//Export app for testing:
exports.default = app;
