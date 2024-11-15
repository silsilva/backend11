"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comercio = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("./db");
class Comercio extends sequelize_1.Model {
    push(comercio) {
        throw new Error("Method not implemented.");
    }
}
exports.Comercio = Comercio;
Comercio.init({
    comercio: sequelize_1.DataTypes.STRING,
    lat: sequelize_1.DataTypes.FLOAT,
    lng: sequelize_1.DataTypes.FLOAT,
    zone: sequelize_1.DataTypes.STRING,
    rubro: sequelize_1.DataTypes.STRING,
}, { sequelize: db_1.sequelize, modelName: "comercio" });
