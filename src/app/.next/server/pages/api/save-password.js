"use strict";
(() => {
var exports = {};
exports.id = 587;
exports.ids = [587];
exports.modules = {

/***/ 661:
/***/ ((module) => {

module.exports = require("sqlite3");

/***/ }),

/***/ 887:
/***/ ((module) => {

module.exports = import("sqlite");;

/***/ }),

/***/ 113:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 291:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ openDB)
/* harmony export */ });
/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(661);
/* harmony import */ var sqlite3__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sqlite3__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sqlite__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(887);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([sqlite__WEBPACK_IMPORTED_MODULE_1__]);
sqlite__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


async function openDB() {
    return (0,sqlite__WEBPACK_IMPORTED_MODULE_1__.open)({
        filename: "./storepass.db",
        driver: (sqlite3__WEBPACK_IMPORTED_MODULE_0___default().Database)
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 83:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  R: () => (/* binding */ generateToken),
  W: () => (/* binding */ verifyToken)
});

;// CONCATENATED MODULE: external "jsonwebtoken"
const external_jsonwebtoken_namespaceObject = require("jsonwebtoken");
var external_jsonwebtoken_default = /*#__PURE__*/__webpack_require__.n(external_jsonwebtoken_namespaceObject);
;// CONCATENATED MODULE: ./lib/jwt.js

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key";
function generateToken(user) {
    return external_jsonwebtoken_default().sign({
        email: user.email
    }, SECRET_KEY, {
        expiresIn: "2h"
    });
}
function verifyToken(token) {
    try {
        return external_jsonwebtoken_default().verify(token, SECRET_KEY);
    } catch (err) {
        return null;
    }
}


/***/ }),

/***/ 797:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(291);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(113);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_jwt__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(83);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const ENCRYPTION_KEY = crypto__WEBPACK_IMPORTED_MODULE_1___default().randomBytes(32);
const IV_LENGTH = 16;
function encrypt(text) {
    const iv = crypto__WEBPACK_IMPORTED_MODULE_1___default().randomBytes(IV_LENGTH);
    const cipher = crypto__WEBPACK_IMPORTED_MODULE_1___default().createCipheriv("aes-256-cbc", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    return iv.toString("hex") + ":" + encrypted;
}
async function handler(req, res) {
    if (req.method !== "POST") return res.status(405).end();
    const { token } = req.headers;
    const payload = (0,_lib_jwt__WEBPACK_IMPORTED_MODULE_2__/* .verifyToken */ .W)(token);
    if (!payload) return res.status(403).json({
        message: "Invalid token"
    });
    const { service, password } = req.body;
    const encryptedPassword = encrypt(password);
    const db = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__/* .openDB */ .X)();
    await db.run("CREATE TABLE IF NOT EXISTS passwords (id INTEGER PRIMARY KEY AUTOINCREMENT, user_email TEXT, service TEXT, encrypted_password TEXT)");
    await db.run("INSERT INTO passwords (user_email, service, encrypted_password) VALUES (?, ?, ?)", [
        payload.email,
        service,
        encryptedPassword
    ]);
    res.status(200).json({
        message: "Password stored securely"
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(797));
module.exports = __webpack_exports__;

})();