"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comercio = exports.User = void 0;
const users_1 = require("./users");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return users_1.User; } });
const comercio_1 = require("./comercio");
Object.defineProperty(exports, "Comercio", { enumerable: true, get: function () { return comercio_1.Comercio; } });
users_1.User.hasMany(comercio_1.Comercio);
comercio_1.Comercio.belongsTo(users_1.User);
