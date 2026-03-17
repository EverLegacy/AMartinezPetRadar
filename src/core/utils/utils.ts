
import { envs } from "src/config/envs";


export const generateMapboxImage = (lat:number,lon:number) : string =>{
    const accessToken = envs.MAPBOX_TOKEN;
    const zoom = 11;
    const width = 800;
    const height = 400;
    return `https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-l+000(${lon},${lat})/${lon},${lat},${zoom}/${width}x${height}?access_token=${accessToken}`;
}

export const generateFoundLostMapboxImage = (params: {
    foundLat: number;
    foundLng: number;
    lostLat: number;
    lostLng: number;
}): string => {
    const accessToken = envs.MAPBOX_TOKEN;
    const width = 800;
    const height = 400;
    const style = "mapbox/streets-v12";
    // Mapbox expects lng,lat
    const foundMarker = `pin-s-f+1D4ED8(${params.foundLng},${params.foundLat})`;
    const lostMarker = `pin-s-l+DC2626(${params.lostLng},${params.lostLat})`;
    return `https://api.mapbox.com/styles/v1/${style}/static/${foundMarker},${lostMarker}/auto/${width}x${height}?access_token=${accessToken}`;
};