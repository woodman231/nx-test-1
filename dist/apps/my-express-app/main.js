/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("socket.io-stream");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@faker-js/faker");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const express_1 = tslib_1.__importDefault(__webpack_require__(2));
const path = tslib_1.__importStar(__webpack_require__(3));
const socket_io_1 = __webpack_require__(4);
const socket_io_stream_1 = tslib_1.__importDefault(__webpack_require__(5));
const faker_1 = __webpack_require__(6);
const app = (0, express_1.default)();
app.use('/assets', express_1.default.static(path.join(__dirname, 'assets')));
app.get('/api', (req, res) => {
    const user = {
        id: 1,
        email: "foo@bar.com",
        name: "Foo Bar"
    };
    res.send({ message: 'Welcome to my-express-app', user });
});
app.get('/api/hw', (req, res) => {
    const post = {
        id: 1,
        title: "Hello World",
        content: "This is a post about Hello World",
        published: true,
        authorId: 1
    };
    res.send({ message: 'Hello World', post });
});
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
const io = new socket_io_1.Server(server, {
    path: '/api/socket.io'
});
io.on('connection', (socket) => {
    console.log('a user connected');
    (0, socket_io_stream_1.default)(socket).on('greetings', (stream) => {
        const randomString = faker_1.faker.lorem.sentences(5);
        const randomStringAsByteArray = Buffer.from(randomString);
        const lengthAsByteArray = Buffer.alloc(4);
        lengthAsByteArray.writeUInt32BE(randomStringAsByteArray.length, 0);
        stream.write(lengthAsByteArray);
        for (let i = 0; i < randomStringAsByteArray.length; i++) {
            stream.write(Buffer.from([randomStringAsByteArray[i]]));
        }
        stream.end();
    });
});
server.on('error', console.error);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map