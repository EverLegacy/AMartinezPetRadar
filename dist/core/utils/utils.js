"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateFoundLostMapboxImage = exports.generateMapboxImage = void 0;
const envs_1 = require("../../config/envs");
const generateMapboxImage = (lat, lon) => {
    const accessToken = envs_1.envs.MAPBOX_TOKEN;
    const zoom = 11;
    const width = 800;
    const height = 400;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
};
exports.generateMapboxImage = generateMapboxImage;
const generateFoundLostMapboxImage = (params) => {
    const accessToken = envs_1.envs.MAPBOX_TOKEN;
    const width = 800;
    const height = 400;
    const style = "mapbox/streets-v12";
    const foundMarker = `pin-s-f+1D4ED8(${params.foundLng},${params.foundLat})`;
    const lostMarker = `pin-s-l+DC2626(${params.lostLng},${params.lostLat})`;
    return `https://api.mapbox.com/styles/v1/${style}/static/${foundMarker},${lostMarker}/auto/${width}x${height}?access_token=${accessToken}`;
};
exports.generateFoundLostMapboxImage = generateFoundLostMapboxImage;
//# sourceMappingURL=utils.js.map