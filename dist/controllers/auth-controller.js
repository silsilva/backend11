"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = exports.updatePassword = exports.checkUser = exports.getUser = exports.newAuth = exports.authToken = exports.newUser = void 0;
const models_1 = require("../models");
const auth_1 = require("../models/auth");
const crypto = __importStar(require("crypto"));
const jtw = __importStar(require("jsonwebtoken"));
const SECRET = process.env.SECRET;
function getSHA256ofString(text) {
    return crypto.createHash("sha256").update(text).digest("hex");
}
//APROBADOS
async function newUser(name, email) {
    const [user, created] = await models_1.User.findOrCreate({
        where: {
            email: email,
        },
        defaults: {
            name: name,
            email: email,
        },
    });
    return {
        user,
        created,
    };
}
exports.newUser = newUser;
async function authToken(email, password) {
    const res = await auth_1.Auth.findOne({
        where: { email: email, password: password },
    });
    return res;
}
exports.authToken = authToken;
async function newAuth(userId, email, password) {
    const [auth, authCreated] = await auth_1.Auth.findOrCreate({
        where: { user_id: userId },
        defaults: {
            email: email,
            password: password,
            user_id: userId,
        },
    });
    return {
        auth,
        authCreated,
    };
}
exports.newAuth = newAuth;
async function getUser(userId) {
    const user = await models_1.User.findByPk(userId);
    return user;
}
exports.getUser = getUser;
async function checkUser(email) {
    const user = await models_1.User.findOne({
        where: {
            email: email,
        },
    });
    if (user) {
        return true;
    }
    else {
        return false;
    }
}
exports.checkUser = checkUser;
async function updatePassword(userId, password) {
    const auth = await auth_1.Auth.findByPk(userId);
    await auth.update({ password });
    return auth;
}
exports.updatePassword = updatePassword;
async function getToken(UserData) {
    const auth = await auth_1.Auth.findOne({
        where: {
            email: UserData.email,
            password: getSHA256ofString(UserData.password),
        },
    });
    if (auth) {
        const token = jtw.sign({ id: auth.get("user_id") }, SECRET);
        return token;
    }
    else {
        return false;
    }
}
exports.getToken = getToken;
