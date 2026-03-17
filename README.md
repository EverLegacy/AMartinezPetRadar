<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## PetRadar

API REST en **NestJS** para registrar **mascotas perdidas** y **mascotas encontradas**.

Cuando se registra una mascota encontrada (`POST /api/found-pets`), el sistema:

- Guarda el hallazgo en `found_pets`
- Busca automáticamente en `lost_pets` (solo activas: `is_active = true`) dentro de **500 metros** usando **PostGIS** con `ST_DWithin` y cast obligatorio a `::geography`
- Envía un **correo** (a un correo genérico configurado) incluyendo datos del hallazgo, contacto del finder, y un mapa estático de **Mapbox** con ambos puntos.

## Project setup

```bash
$ npm install
```

## Requisitos

- Node.js (recomendado 18+)
- Docker (para Postgres/PostGIS)

## Variables de entorno

Crea un `.env` en la raíz con algo como:

```bash
PORT=3000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=petradar
DB_USER=postgres
DB_PASSWORD=postgres

MAPBOX_TOKEN=YOUR_MAPBOX_TOKEN

MAILER_SERVICE=gmail
MAILER_EMAIL=YOUR_EMAIL@gmail.com
MAILER_PASSWORD=YOUR_APP_PASSWORD

# correo genérico destino (si se deja vacío, usa MAILER_EMAIL)
MAIL_TO=dev@example.com
```

## Base de datos (PostGIS)

Levanta Postgres/PostGIS:

```bash
docker compose up -d
```

Ejecuta migraciones:

```bash
npm run migration:run
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Endpoints

Base URL: `http://localhost:PORT/api`

### POST `/lost-pets`

Registra mascota perdida.

Body ejemplo:

```json
{
  "name": "Luna",
  "species": "perro",
  "breed": "mestizo",
  "color": "café",
  "size": "mediano",
  "description": "Collar rojo",
  "photo_url": null,
  "owner_name": "Ana",
  "owner_email": "ana@example.com",
  "owner_phone": "5512345678",
  "lat": 19.4326,
  "lng": -99.1332,
  "address": "Centro, CDMX",
  "lost_date": "2026-03-16T18:00:00.000Z",
  "is_active": true
}
```

### POST `/found-pets`

Registra mascota encontrada + dispara búsqueda por radio (500m) + notificación por correo.

Body ejemplo:

```json
{
  "species": "perro",
  "breed": "mestizo",
  "color": "café",
  "size": "mediano",
  "description": "Asustado pero bien",
  "photo_url": null,
  "finder_name": "Carlos",
  "finder_email": "carlos@example.com",
  "finder_phone": "5598765432",
  "lat": 19.4331,
  "lng": -99.1327,
  "address": "Cerca del Zócalo, CDMX",
  "found_date": "2026-03-16T19:00:00.000Z"
}
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
