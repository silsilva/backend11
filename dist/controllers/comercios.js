"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comercio = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../models/db");
class Comercio extends sequelize_1.Model {
}
exports.Comercio = Comercio;
Comercio.init({
    nombre: sequelize_1.DataTypes.STRING,
    rubro: sequelize_1.DataTypes.STRING,
    lat: sequelize_1.DataTypes.FLOAT,
    lng: sequelize_1.DataTypes.FLOAT,
}, {
    sequelize: db_1.sequelize,
    modelName: "Comercio",
});
