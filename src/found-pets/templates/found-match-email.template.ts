import { generateFoundLostMapboxImage } from "src/core/utils/utils";

export type LostPetMatch = {
    id: number;
    name: string;
    species: string;
    breed: string;
    color: string;
    size: string;
    description: string;
    photo_url: string | null;
    owner_name: string;
    owner_email: string;
    owner_phone: string;
    address: string;
    lost_date: string | Date;
    distance: number;
    lost_lat: number;
    lost_lng: number;
};

export type FoundPetForEmail = {
    species: string;
    breed: string | null;
    color: string;
    size: string;
    description: string;
    photo_url: string | null;
    finder_name: string;
    finder_email: string;
    finder_phone: string;
    address: string;
    found_date: string | Date;
    found_lat: number;
    found_lng: number;
};

export const generateFoundMatchEmailTemplate = (args: {
    found: FoundPetForEmail;
    lost: LostPetMatch;
}): string => {
    const mapUrl = generateFoundLostMapboxImage({
        foundLat: args.found.found_lat,
        foundLng: args.found.found_lng,
        lostLat: args.lost.lost_lat,
        lostLng: args.lost.lost_lng,
    });

    const distanceMeters = Math.round(args.lost.distance);
    const date = new Date().toLocaleString("es-MX");
    const lostDate = new Date(args.lost.lost_date).toLocaleString("es-MX");
    const foundDate = new Date(args.found.found_date).toLocaleString("es-MX");

    return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style="margin:0;padding:0;background:#f3f4f6;font-family:Segoe UI,Roboto,Arial,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0;">
          <tr>
            <td align="center">
              <table width="680" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 8px 28px rgba(0,0,0,0.08);">
                <tr>
                  <td style="padding:28px 32px;background:linear-gradient(135deg,#111827,#1f2937);color:#fff;">
                    <div style="font-size:12px;opacity:0.85;letter-spacing:0.08em;text-transform:uppercase;">PetRadar</div>
                    <div style="font-size:22px;font-weight:700;margin-top:8px;">Posible coincidencia en un radio de 500m</div>
                    <div style="font-size:13px;opacity:0.85;margin-top:6px;">Generado: ${date}</div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:24px 32px 0;">
                    <h2 style="margin:0 0 10px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Mascota encontrada</h2>
                    <div style="font-size:15px;color:#111827;line-height:1.55;">
                      <b>Especie:</b> ${args.found.species}<br/>
                      <b>Raza:</b> ${args.found.breed ?? "No identificada"}<br/>
                      <b>Color:</b> ${args.found.color}<br/>
                      <b>Tamaño:</b> ${args.found.size}<br/>
                      <b>Descripción:</b> ${args.found.description}<br/>
                      <b>Dirección aprox:</b> ${args.found.address}<br/>
                      <b>Fecha hallazgo:</b> ${foundDate}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 32px 0;">
                    <h2 style="margin:0 0 10px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Contacto de quien encontró</h2>
                    <div style="font-size:15px;color:#111827;line-height:1.55;">
                      <b>Nombre:</b> ${args.found.finder_name}<br/>
                      <b>Email:</b> ${args.found.finder_email}<br/>
                      <b>Teléfono:</b> ${args.found.finder_phone}
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:18px 32px 0;">
                    <h2 style="margin:0 0 10px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Mascota perdida (posible match)</h2>
                    <div style="font-size:15px;color:#111827;line-height:1.55;">
                      <b>Nombre:</b> ${args.lost.name}<br/>
                      <b>Especie:</b> ${args.lost.species}<br/>
                      <b>Raza:</b> ${args.lost.breed}<br/>
                      <b>Color:</b> ${args.lost.color}<br/>
                      <b>Tamaño:</b> ${args.lost.size}<br/>
                      <b>Descripción:</b> ${args.lost.description}<br/>
                      <b>Dirección aprox:</b> ${args.lost.address}<br/>
                      <b>Fecha pérdida:</b> ${lostDate}<br/>
                      <b>Distancia estimada:</b> ${distanceMeters} m
                    </div>
                  </td>
                </tr>

                <tr>
                  <td style="padding:22px 32px;">
                    <h2 style="margin:0 0 10px;font-size:14px;color:#6b7280;text-transform:uppercase;letter-spacing:0.04em;">Mapa (pérdida vs hallazgo)</h2>
                    <img alt="Mapa" src="${mapUrl}" style="width:100%;display:block;border-radius:12px;border:1px solid #e5e7eb;" />
                  </td>
                </tr>

                <tr>
                  <td style="padding:0 32px 26px;">
                    <div style="font-size:12px;color:#6b7280;line-height:1.5;border-top:1px solid #e5e7eb;padding-top:14px;">
                      Este correo fue enviado automáticamente por PetRadar al detectar una mascota perdida activa dentro de 500 metros.
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

