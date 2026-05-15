export function generateFoundMatchEmailTemplate({
  found,
  lost,
}: {
  found: any;
  lost: any;
}) {
  return `
  <div style="font-family: Arial; background:#f5f5f5; padding:20px;">
    <div style="max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px;">

      <h2 style="color:#333;">PetRadar</h2>
      <h3>Posible coincidencia en un radio de 500m</h3>

      <hr/>

      <h3>Mascota encontrada</h3>
      <p><b>Especie:</b> ${found.species}</p>
      <p><b>Raza:</b> ${found.breed ?? "N/A"}</p>
      <p><b>Color:</b> ${found.color}</p>
      <p><b>Tamaño:</b> ${found.size}</p>
      <p><b>Descripción:</b> ${found.description}</p>
      <p><b>Dirección:</b> ${found.address}</p>
      <p><b>Fecha hallazgo:</b> ${found.found_date}</p>

      <hr/>

      <h3>Contacto del finder</h3>
      <p><b>Nombre:</b> ${found.finder_name}</p>
      <p><b>Email:</b> ${found.finder_email}</p>
      <p><b>Teléfono:</b> ${found.finder_phone}</p>

      <hr/>

      <h3>Mascota perdida (match)</h3>
      <p><b>Nombre:</b> ${lost.name}</p>
      <p><b>Especie:</b> ${lost.species}</p>
      <p><b>Raza:</b> ${lost.breed}</p>
      <p><b>Color:</b> ${lost.color}</p>
      <p><b>Tamaño:</b> ${lost.size}</p>
      <p><b>Descripción:</b> ${lost.description}</p>
      <p><b>Dirección:</b> ${lost.address}</p>
      <p><b>Fecha pérdida:</b> ${lost.lost_date}</p>

      <hr/>

      <p><b>Distancia estimada:</b> ${Math.round(lost.distance)} metros</p>

      <br/>
      <small>Este correo fue enviado automáticamente por PetRadar</small>
    </div>
  </div>
  `;
}