"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchComercioAround = exports.getUserComercio = exports.deleteComercio = exports.getComercio = exports.modifyComercio = exports.reportComercio = void 0;
const models_1 = require("../models");
const algolia_1 = require("../lib/algolia");
async function reportComercio(userId, params) {
    const user = await models_1.User.findByPk(userId);
    if (user) {
        const newPet = await models_1.Comercio.create({
            ...params,
            userId: user.get("id"),
        });
        const algoliaRes = await algolia_1.indexComercio.saveObject({
            objectID: newPet.get("id"),
            _geoloc: {
                lat: newPet.get("lat"),
                lng: newPet.get("lng"),
            },
        });
        return { newPet, algoliaRes };
    }
    else {
        throw "usuario no encontrado";
    }
}
exports.reportComercio = reportComercio;
function bodyToIndex(body, id) {
    const respuesta = {};
    if (body.lat && body.lng) {
        respuesta._geoloc = {
            lat: body.lat,
            lng: body.lng,
        };
    }
    if (id) {
        respuesta.objectID = id;
    }
    return respuesta;
}
async function modifyComercio(params, comercioId) {
    if (!params) {
        throw "faltan datos de la mascota ";
    }
    const comercioData = { ...params };
    const modifyComercio = await models_1.Comercio.update(comercioData, {
        where: {
            id: comercioId,
        },
    });
    const indexItem = bodyToIndex(comercioData, comercioId);
    algolia_1.indexComercio.partialUpdateObject(indexItem);
    return modifyComercio;
}
exports.modifyComercio = modifyComercio;
async function getComercio(comercioId) {
    const comercio = await models_1.Comercio.findByPk(comercioId);
    if (comercio) {
        return comercio;
    }
    else {
        throw "comercio not found";
    }
}
exports.getComercio = getComercio;
async function deleteComercio(comercioId) {
    const comercio = await models_1.Comercio.destroy({
        where: {
            id: comercioId,
        },
    });
    return comercio;
}
exports.deleteComercio = deleteComercio;
async function getUserComercio(userId) {
    const comercio = await models_1.Comercio.findAll({
        where: {
            userId,
        },
    });
    return comercio;
}
exports.getUserComercio = getUserComercio;
async function searchComercioAround(lat, lng) {
    const { hits } = await algolia_1.indexComercio.search("", {
        aroundLatLng: [lat, lng].join(","),
        aroundRadius: 500000,
    });
    const comercios = [];
    for (const hit of hits) {
        const comercio = await models_1.Comercio.findByPk(hit.objectID);
        if (comercio) {
            comercios.push(comercio);
        }
    }
    return comercios;
}
exports.searchComercioAround = searchComercioAround;
