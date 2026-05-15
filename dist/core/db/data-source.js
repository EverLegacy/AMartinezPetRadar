"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = exports.dataSourceOptions = void 0;
const envs_1 = require("../../config/envs");
const typeorm_1 = require("typeorm");
const lost_pet_entity_1 = require("./entities/lost-pet.entity");
const found_pet_entity_1 = require("./entities/found-pet.entity");
console.log('DB CONFIG:', {
    host: envs_1.envs.DB_HOST,
    port: envs_1.envs.DB_PORT,
    user: envs_1.envs.DB_USER,
    password: envs_1.envs.DB_PASSWORD,
});
exports.dataSourceOptions = {
    host: envs_1.envs.DB_HOST,
    type: 'postgres',
    port: envs_1.envs.DB_PORT,
    database: envs_1.envs.DB_NAME,
    username: envs_1.envs.DB_USER,
    password: envs_1.envs.DB_PASSWORD,
    entities: [lost_pet_entity_1.LostPet, found_pet_entity_1.FoundPet],
    synchronize: false,
    migrations: ["dist/core/db/migrations/*"]
};
exports.dataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
//# sourceMappingURL=data-source.js.map